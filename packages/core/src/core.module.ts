import { Module, forwardRef, Global } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from '@packages/logger';
import { CacheModule } from './cache/cache.module';
import { AuditProducer } from './producers/audit-producer/audit-producer.module';
import { AuthModule } from './auth/auth.module';
import { NotificationProducerModule } from './producers/notification-producer/notification-producer.module';

@Global()
@Module({
  imports: [
    forwardRef(() => EventEmitterModule.forRoot() ),
    forwardRef(() => LoggerModule),
    forwardRef(() => CacheModule),
    forwardRef(() => AuditProducer),
    forwardRef(() => AuthModule),
    forwardRef(() => NotificationProducerModule),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
