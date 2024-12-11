import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@packages/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuditProducerService } from './audit-producer.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'AUDIT_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create(configService.getAuditQueueOptions())
      ),
      inject: [ConfigService],
    },
    AuditProducerService
  ],
  exports: [AuditProducerService]
})
export class AuditProducer {}
