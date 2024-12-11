import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@packages/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { NotificationProducerService } from './notification-producer.service';
import { RMQ_SERVICE } from '@packages/common';
import { ConsumerMessageMapper } from './mappers/consumer-message.mapper';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RMQ_SERVICE.NOTIFICATON_RMQ_SERVICE,
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create(configService.getNotificationQueueOptions())
      ),
      inject: [ConfigService],
    },
    NotificationProducerService,
    ConsumerMessageMapper
  ],
  exports: [NotificationProducerService]
})
export class NotificationProducerModule {}
