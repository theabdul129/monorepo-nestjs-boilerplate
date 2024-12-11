import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@packages/config';
import { AuditOptions, METHOD_AUDIT_METADATA, X_ACCESS_TOKEN, X_CORRELATION_ID, X_REFRESH_TOKEN, X_TENANT_ID, X_USER_ID } from '@packages/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
export interface ILogging {
    REQUEST_START_TIME: number;
    REQUEST_METHOD: string;
    REQUEST_URL: string;
    REQUEST_BODY: unknown;
    REQUEST_QUERY: Record<string, any>;
    REQUEST_HEADERS: Record<string, any>;
    RESPONSE_HEADERS: Record<string, any>;
    RESPONSE_BODY: Record<string, any>;
    STATUS: number;
    REQUEST_END_TIME: number;
    ERROR_MESSAGE: string | null;
    ERROR_STACK_TRACE: string | null;
}

export class AuditHandler {
  private logger: Logger = new Logger('HTTP')
  private request: Request & { user: any, session: any, tenant: any, channel: any };
  private response: Response;
  private options: AuditOptions;
  private now: number;
  private emitter: EventEmitter2;
  private error: any = null;
  private prefix: string;
  private masked_request_body:  unknown;
  private masked_request_headers:  Record<string, any> = {};
  private masked_response_headers:  Record<string, any> = {};
  private masked_response_body:  unknown = {};
  private config: ConfigService;

  constructor(context: ExecutionContext, configService: ConfigService, emitter: EventEmitter2, reflector: Reflector, now: number, body: unknown, error: any = null) {
    this.now = now;
    this.config = configService;
    this.emitter  = emitter;
    this.request  = context.switchToHttp().getRequest();
    this.response = context.switchToHttp().getResponse();
    this.options  = reflector.get(METHOD_AUDIT_METADATA, context.getHandler());
    this.prefix   = `[${context.getClass().name}::${context.getHandler().name}]`;
    this.error    = error;
    this.masked_request_body    = this.options?.mask?.request ? this.maskData(this.request.body, this.options.mask.request) : this.request.body;
    this.masked_response_body   = (this.options?.mask?.response && body) ? this.maskData(body, this.options.mask.response) : body;
    this.masked_request_headers = this.maskHeaders(this.request.headers);
    this.masked_response_headers = this.maskHeaders(this.response.getHeaders());
  }

  getDelay(): number {
    return Date.now() - this.now;
  }

  getUserId(): number | string {
    return this.request?.user?.id || (this.request?.headers?.[X_USER_ID] as string) || 'unknown';
  }

  getAuthUserId(): number | string {
    return this.request?.user?.auth_user_id || 'unknown';
  }

  getSessionId(): number | string {
    return this.request?.session?.id || 'unknown';
  }

  getTenantId(): number | string {
    return this.request?.headers?.[X_TENANT_ID] as string || 'unknown';
  }

  getRequestId(): number | string {
    return (this.request?.headers?.[X_CORRELATION_ID] as string) || (this.request?.headers?.['x-kong-request-id'] as string) || 'unknown';
  }

  getMessage(): string {
    if(this.error) {
        const exceptionStack: string = 'stack' in this.error ? this.error.stack : '';

        const statusCode = this.error.getStatus ? this.error.getStatus() : 500;
        // const errorMessage = this.error.message || 'Internal server error';
        // const errorResponse = this.error.response ? JSON.stringify(error.response) : '';
        return `${this.prefix} ${this.request.method} ${this.request.url} ${statusCode} ${this.getDelay()}ms - Stack: ${exceptionStack} - UID: [${this.getUserId()}] RID: [${this.getRequestId()}]`;
    }
    return `${this.prefix} ${this.request.method} ${this.request.url} ${this.response.statusCode} ${this.getDelay()}ms - UID: [${this.getUserId()}] RID: [${this.getRequestId()}]`;
  }

  getIPAddress(): string {
    // Check for the forwarded IP address if the request is behind a proxy
    const forwarded = this.request.headers['x-forwarded-for'];
    if (forwarded) {
        return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    }
    // Fall back to the remote IP if no forwarded IP is found
    return this.request.connection.remoteAddress || '';
}


    get masking_placeholder(): string {
        return '****';
    }

    private maskData(parsedData: unknown, maskingOptions: string[] | true, path: string = ''): unknown {
        // Parse the data to avoid having constructors like new ObjectId() in the body and handle circular references
        // const parsedData = parse(stringify(data));
        // if (this.disableMasking) {
        //   return parsedData;
        // }
        if (maskingOptions === true || maskingOptions.includes(path)) {
          return this.masking_placeholder;
        }
        if (Array.isArray(parsedData)) {
          return parsedData.map((item: unknown): unknown => this.maskData(item, maskingOptions, path));
        }
        // eslint-disable-next-line no-null/no-null
        if (typeof parsedData === 'object' && parsedData !== null) {
          return Object.keys(parsedData).reduce<object>((maskedObject: object, key: string): object => {
            const nestedPath = path ? `${path}.${key}` : key;
            return {
              ...maskedObject,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              [key]: this.maskData((parsedData as any)[key], maskingOptions, nestedPath),
            };
          }, {});
        }
        return parsedData;
    }

    get mask():any {
        return {
            requestHeader: ['authorization', 'refresh', X_REFRESH_TOKEN, X_ACCESS_TOKEN]
        }
    }

    private maskHeaders(headers: Record<string, unknown> = {}): Record<string, unknown> {
        // if (this.disableMasking || this.mask?.requestHeader === undefined) {
        //   return headers;
        // }

        return Object.keys(headers).reduce<Record<string, unknown>>(
        (maskedHeaders: Record<string, unknown>, headerKey: string): Record<string, unknown> => {
            const headerValue = headers[headerKey];
            const mask = this.mask?.requestHeader?.[headerKey];

            if (headerValue === undefined) {
            return maskedHeaders;
            }

            if (mask === true) {
            return {
                ...maskedHeaders,
                [headerKey]: this.masking_placeholder,
            };
            }

            if (typeof mask === 'function') {
            try {
                return {
                ...maskedHeaders,
                [headerKey]: mask(headerValue),
                };
            } catch (err) {
                this.logger.warn(`AuditInterceptor - Masking error for header ${headerKey}`, err);

                return {
                ...maskedHeaders,
                [headerKey]: this.masking_placeholder,
                };
            }
            }

            return maskedHeaders;
        },
        headers,
        );
    }

  logCtx(): ILogging{
    const ctx: ILogging = {
        REQUEST_START_TIME: this.now,
        REQUEST_METHOD: this.request.method,
        REQUEST_URL: this.request.url,
        REQUEST_BODY: this.masked_request_body,
        REQUEST_QUERY: this.request.query || {},
        REQUEST_HEADERS: this.masked_request_headers,
        RESPONSE_HEADERS: this.masked_response_headers,
        RESPONSE_BODY: this.error ? this.error?.response : this.masked_response_body as any,
        STATUS: 0,
        REQUEST_END_TIME: Date.now() - this.now,
        ERROR_MESSAGE: null,
        ERROR_STACK_TRACE: null
    }
    if(this.error) {
        ctx.STATUS = this.error.getStatus ? this.error.getStatus() : 500;
        ctx.ERROR_MESSAGE = this.error.message || 'Internal server error';
        ctx.ERROR_STACK_TRACE = this.error?.stack;
        return ctx;
    }
    ctx.STATUS = this.response.statusCode;
    return ctx;
  }

  trigger(): void {
    const ctx = this.logCtx();
    const audit = {
        correlation_id: this.getRequestId(),
        tenant_id: this.request?.tenant?.id,
        tenant_slug: this.request?.tenant?.slug,
        channel_id: this.request?.channel?.id,
        channel_slug: this.request?.channel?.slug,
        session_id: this.getSessionId(),
        auth_user_id: this.getAuthUserId(),
        user_id: this.getUserId(),
        user_type: 'CUSTOMER',
        user_name: '',
        role_id: '',
        role_name: '',
        ip_address: this.getIPAddress(),
        geo_location: '#',
        service_name: this.config.application_name,
        request_method: this.request.method,
        request_url: this.request.url,
        request_headers: ctx.REQUEST_HEADERS,
        request_body: ctx.REQUEST_BODY,
        response_status: ctx.STATUS,
        response_headers: ctx.RESPONSE_HEADERS,
        response_body: ctx.RESPONSE_BODY,
        audit_code: this.options?.code || 'unknown',
        audit_text: this.options?.description,
        status: 'S'
    }
    if(this.error) {
        audit.status = 'F'
        if(audit.response_status >= 500) {
            this.logger.error(this.getMessage(), ctx);
        }
        this.logger.warn(this.getMessage(), ctx);
    } else {
        this.logger.log(this.getMessage(), ctx);
    }
    
    this.emitter.emit('audit.log', audit);
    return;
  }
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
    ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    // if(!this.configService.enable_audit_logging) {
    //     return next.handle();
    // }

    return next.handle().pipe(
        tap({
          next: (val: any): void => {
            const handler = new AuditHandler(context, this.configService, this.emitter, this.reflector, now, val?.data);
            handler.trigger();
          },
          error: (_): void => {
            const handler = new AuditHandler(context,this.configService, this.emitter, this.reflector, now, null, _);
            handler.trigger();
          },
        }),
      );
  }
}
