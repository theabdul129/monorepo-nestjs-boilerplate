import 'module-alias/register';
import { INestApplication, ValidationPipe, Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, RmqOptions } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as hpp from 'hpp';
import { ConfigService } from '@packages/config';
import { HEADER, HttpExceptionFilter, I18nHelper } from '@packages/common';
import { LoggerService } from '@packages/logger';
import { HelmetMiddleware } from './middlewares/helmet.middleware';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { GlobalTenantGuard } from './guards/tenant.guard';

export class Server {
  #app: INestApplication;
  #config: ConfigService;
  readonly #logger: Logger = new Logger(Server.name);

  get app(): INestApplication {
    return this.#app;
  }

  get config(): ConfigService {
    return this.#config;
  }

  constructor(app: INestApplication) {
    this.#app = app;
    this.#config = app.get(ConfigService);
    this.#app.useLogger(this.app.get(LoggerService));
    this.enableCors();
    this.mountGlobals();
    this.mountMiddleware();
        // Swagger.register(this.#app, this.#config);
  }

  private enableCors(): void {
    this.app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
      exposedHeaders: Object.values(HEADER).join(' , '),
      credentials: true,
    });
    return;
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddleware(): void {
    HelmetMiddleware.register(this.#app)
  // //   CorsMiddleware.register(this.#app, this.config.get('WHITELISTED_ORIGINS'));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json({ limit: '500mb' }));
    /*
     * Middleware: Compress response bodies for all request
     */
    this.app.use(compression());

    /*
     * Middleware: protect against HTTP Parameter Pollution attacks
     */
    this.app.use(hpp());
  }

  /**
   * Mounts all the defined globals
   */
  private mountGlobals(): void {
    // Registering Hooks, logger, validators, pipes and Exception / Error Handlers
    this.app.enableShutdownHooks();    
    this.app.useGlobalFilters(new HttpExceptionFilter(this.app.get(I18nHelper)));
    this.app.useGlobalGuards(new GlobalTenantGuard(this.app.get(Reflector),this.config));
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    );
    this.app.useGlobalInterceptors(new AuditInterceptor(this.app.get(EventEmitter2), this.app.get(Reflector), this.config));
    // this.app.useGlobalPipes(
    //   new ValidationPipe({
    //     transform: true,
    //     whitelist: true,
    //     exceptionFactory: (errors: ValidationError[] | any[]) => new ValidationException(errors),
    //   }),
    // );
    this.app.setGlobalPrefix(this.config.prefix);
  }

  static async create(module: any, options?: NestApplicationOptions): Promise<Server> {
    const app = await NestFactory.create(module, options);
    return new Server(app)
  }

  /**
   * Starts the express server
   */
  start(queueOptions?: RmqOptions): void {
    // Start the server on the specified port
    if(queueOptions?.transport) {
      this.app.connectMicroservice<MicroserviceOptions>(queueOptions);
      this.app.startAllMicroservices();
    }
    this.app.listen(this.config.port, () => {
      this.onStartUp();
    });

    process.on('SIGTERM', async () => {
      await this.app.close();
      process.exit(0);
    });
    return;
  }

  /**
   * Print stats on startup
   */
  private onStartUp(queueOptions?: RmqOptions): void {
    this.#logger.debug('============================================================');
    this.#logger.debug(`Application has started in [${this.config.environment}]  Mode`);
    this.#logger.debug('============================================================');
    this.#logger.log(``);
    this.#logger.log(`Application Name   : ${this.config.application_name}`);
    this.#logger.log(`Version            : ${this.config.application_version}`);
    this.#logger.log(`Environment        : ${this.config.environment}`);
    this.#logger.log(`Log Level          : [${this.config.log_level}]`);
    if(this.config.database_host) {
      this.#logger.log(
        `Database           : ${this.config.database_dialect}://${this.config.database_username}:<password>@${this.config.database_host}:${this.config.database_port}/${this.config.database_name}`
      );
    }

    if(this.config.cache.host) {
      this.#logger.log(
        `Redis              : redis://<password>@${this.config.cache.host}:${this.config.cache.port}`
      );
    }
    if(queueOptions) {
      this.#logger.log(
        `RabbitMQ           : [${queueOptions?.options?.queue}]`
      );
    }
    this.#logger.log(``);
    this.#logger.log(
      `Swagger Documentation is listing on http://localhost:${this.config.port}`
    );
    this.#logger.log(
      `🚀 Application start listing on http://localhost:${this.config.port}/${this.config.prefix}`
    );
    this.#logger.log(``);
    this.#logger.log(
      '-----------------------------------------------------------'
    );
    this.#logger.log(`To shut it down, press <CTRL> + C at any time.`);
    this.#logger.log('');
  }
}
