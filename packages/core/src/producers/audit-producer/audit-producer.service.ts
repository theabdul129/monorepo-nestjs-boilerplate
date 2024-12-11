import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT } from '@packages/common';
import { BaseProducer } from '../base.producer';

/**
 * AuditProducerService is responsible for sending audit messages to the audit service.
 */
@Injectable()
export class AuditProducerService extends BaseProducer {
  #logger: Logger = new Logger(AuditProducerService.name)
  constructor(
    @Inject('AUDIT_SERVICE') auditProducer: ClientProxy,
  ) {
    super(auditProducer);
  }

  @OnEvent('audit.log')
  handleAuditLogEvent(event: any) {
    super.emit(EVENT.CREATE_AUDIT, event).subscribe({
      error: (err) => this.#logger.error('Failed to send audit log', err),
    });
  }
}