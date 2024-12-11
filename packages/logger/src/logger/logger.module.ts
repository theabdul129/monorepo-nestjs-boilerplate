import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule } from '@packages/config';
import { LoggerContextService } from './logger-context.service';

@Module({
  imports: [ConfigModule],
  providers: [
    LoggerService,
    LoggerContextService
  ],
  exports: [LoggerService],
})
export class LoggerModule  {}
