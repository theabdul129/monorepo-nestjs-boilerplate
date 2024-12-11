import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseProducer } from '../base.producer';
import { NOTIFICATION_TYPE, RMQ_SERVICE, RMQ_SERVICE_EVENTS } from '@packages/common';
import { CreateMessageNotificationDto } from './dtos/create-message-notification.dto';
import { ConsumerMessageMapper } from './mappers/consumer-message.mapper';

@Injectable()
export class NotificationProducerService extends BaseProducer {
  #logger: Logger = new Logger(NotificationProducerService.name)
  constructor(
    @Inject(RMQ_SERVICE.NOTIFICATON_RMQ_SERVICE) notificationProducer: ClientProxy,
    private consumerMapper: ConsumerMessageMapper

  ) {
    super(notificationProducer);    
    this.consumerMapper = new ConsumerMessageMapper();
  }

  async sendMessage(message: CreateMessageNotificationDto) {
    this.#logger.log("Sending Message", message);

    if(!!message.recipient_email) {
      await this.sendEmail(message);
    }

    if(!!message.recipient_contact) {
      await this.sendSms(message);
    }

    if(!!message.recipient_device_id) {
      await this.sendPush(message);
    }

    return { success: true, message: 'Notifications sent successfully' };
  }

  async sendOTP(message: any) {
    this.emit(RMQ_SERVICE_EVENTS.SEND_OTP,message);
  }

  async verifyOTP(message: any) {
    return this.send(RMQ_SERVICE_EVENTS.VERIFY_OTP, message).toPromise();
  }

  private async sendEmail(message: CreateMessageNotificationDto) {
    const consumerMessageNotification = this.consumerMapper.fromCreateMessageNotificationDto(NOTIFICATION_TYPE.EMAIL, message);      
    return this.emit(RMQ_SERVICE_EVENTS.SEND_EMAIL, consumerMessageNotification);
  }

  private async sendPush(message: CreateMessageNotificationDto) {
    const consumerMessageNotification = this.consumerMapper.fromCreateMessageNotificationDto(NOTIFICATION_TYPE.PUSH, message);      
    this.emit(RMQ_SERVICE_EVENTS.SEND_PUSH,consumerMessageNotification);
  }

  private async sendSms(message: CreateMessageNotificationDto) {
    const consumerMessageNotification = this.consumerMapper.fromCreateMessageNotificationDto(NOTIFICATION_TYPE.SMS, message);      
    this.emit(RMQ_SERVICE_EVENTS.SEND_SMS,consumerMessageNotification);
  }

}