import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LoggerContextService } from './logger-context.service';
import { ConfigService } from '@packages/config';
import { isString } from '@packages/common';
@Injectable()
export class LoggerService implements NestLoggerService {
  #logger: winston.Logger;
  #loggerContextService: LoggerContextService = new LoggerContextService();
  #configService: ConfigService = new ConfigService();

  constructor() {
    const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });


    this.#logger = winston.createLogger({
      level: this.#configService.log_level,
      defaultMeta: {
        environment: this.#configService.environment,
        application: this.#configService.application_name,
        version: this.#configService.application_version,
        node: this.#configService.trans_node
      },
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        this.consoleTransport,
        dailyRotateFileTransport,
      ],
      exceptionHandlers: [
        new winston.transports.DailyRotateFile({
          filename: 'exception-%DATE%.log',
          dirname: 'logs',
          datePattern: this.#configService.logger.date_pattern,
          zippedArchive: true,
          maxSize: this.#configService.logger.max_file_size,
          maxFiles: this.#configService.logger.max_files,
        })
      ],
      rejectionHandlers: [
        new winston.transports.DailyRotateFile({
          filename: 'rejections-%DATE%.log',
          dirname: 'logs',
          datePattern: this.#configService.logger.date_pattern,
          zippedArchive: true,
          maxSize: this.#configService.logger.max_file_size,
          maxFiles: this.#configService.logger.max_files,
        })
      ],
    });
  }

  private get consoleTransport() {

    const consoleFormat = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'MM/DD/YYYY, hh:mm:ss A' }),
      winston.format.prettyPrint({ depth: 5 }),
      winston.format.printf((info) => {
        if(isString(info.props)) {
          return `${info.level} ${info.timestamp} - [${info.props}] ${info.message}`;
        }
        return `${info.level} ${info.timestamp} - ${info.message}`;
      }),
    );
    return new winston.transports.Console({
      format: consoleFormat,
    });
  }

  private formatMessage(message: string): string {
    const context = this.#loggerContextService.getContext();
    let formattedMessage = message;
    if (context?.userId) {
      formattedMessage += ` - userId: ${context.userId}`;
    }
    if (context?.requestId) {
      formattedMessage += ` - requestId: ${context.requestId}`;
    }
    return formattedMessage;
  }

  info(message: string, props: any = {}) {
    this.#logger.info(this.formatMessage(message), { props });
  }

  log(message: string, props: any = {}) {
    this.#logger.info(this.formatMessage(message), { props });
  }

  error(message: string, trace: string, props: any = {}) {
    this.#logger.error(this.formatMessage(message), { trace, props });
  }

  warn(message: string, props: any = {}) {
    this.#logger.warn(this.formatMessage(message), { props });
  }

  debug(message: string, props: any = {}) {
    this.#logger.debug(this.formatMessage(message), { props });
  }

  verbose(message: string, props: any = {}) {
    this.#logger.verbose(this.formatMessage(message), { props });
  }
}
