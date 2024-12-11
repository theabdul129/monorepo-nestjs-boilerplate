import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'lodash';
import { getErrorMessage } from '../utils/error.util';
import { I18nHelper } from '../helpers/i18n.helper';
import { ValidationException } from './validation.filter';
import { HEADER } from '../constants/index';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  #logger = new Logger(HttpExceptionFilter.name)
  constructor(private readonly i18n: I18nHelper) { }

  catch(exception: any & { isApiException: boolean; name: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const name = exception instanceof Error ? exception.name : 'UnknownError';
    const message =
      exception instanceof Error ? exception.message : 'An unknown error occurred';
    const request_id = (request?.headers?.[HEADER.CORRELATION_ID] as string) || (request?.headers?.['x-kong-request-id'] as string) || 'unknown';

    // // Build error log context with advanced metadata
    const logContext = {
      request_id: request_id,
      error_name: name,
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      headers: request.headers,
      body: request.body,
      query: request.query,
      ip: request.ip,
      user_agent: request.headers['user-agent'],
      stack: exception.stack,
    };

    // Log detailed error information using Winston
    this.#logger.error({
      message: `Exception caught in HttpExceptionFilter - ${message}`,
      ...logContext,
    });

    if (status === HttpStatus.PAYLOAD_TOO_LARGE) {
      const payloadMessage = `
        Your request entity size is too big for the server to process it:
        - request size: ${get(exception, 'length')};
        - request limit: ${get(exception, 'limit')}.`;

      response.status(status).send({
        request_id: request_id,
        name: exception.name,
        errors: [
          {
            message: payloadMessage,
            developerMessage: payloadMessage,
          },
        ],
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception?.isApiException) {
      const errorMessage: string = getErrorMessage(exception.getResponse());
      response.status(status).send({
        request_id: request_id,
        name: exception.name,
        errors: [
          {
            message: this.i18n.t(exception.name) || errorMessage,
            developerMessage: exception?.developerMessage || 'No developer message available',
          },
        ],
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof ValidationException) {
      response.status(status).send({
        request_id: request_id,
        name: 'INPUT_VALIDATION_ERROR',
        errors: exception.errors || [],
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const err: any = exception.getResponse();
      const errorMessage: string = getErrorMessage(err);
      response.status(status).send({
        request_id: request_id,
        name: exception.name?.toUpperCase(),
        errors: [
          {
            message: this.i18n.t(exception.name) || errorMessage,
            developerMessage: err?.message || err || 'No developer message available',
          },
        ],
        status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof SyntaxError) {
      response.status(HttpStatus.BAD_REQUEST).send({
        request_id: request_id,
        name: 'SYNTAX_ERROR',
        errors: [
          {
            message: exception.message,
            developerMessage: 'A syntax error occurred during request processing',
          },
        ],
        status: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof TypeError) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        request_id: request_id,
        name: 'TYPE_ERROR',
        errors: [
          {
            message: exception.message,
            developerMessage: 'A type error occurred in the application',
          },
        ],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        request_id: request_id,
        name: name?.toUpperCase() || 'ERROR',
        errors: [
          {
            message: message,
            developerMessage: 'An unexpected error occurred',
          },
        ],
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      request_id: request_id,
      name: 'INTERNAL_SERVER_ERROR',
      errors: [
        {
          message: this.i18n.t('Internal Server Error') || 'An unexpected error occurred',
          developerMessage: 'Unexpected error with no specific handler',
        },
      ],
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
