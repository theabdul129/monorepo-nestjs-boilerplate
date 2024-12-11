import { Injectable } from '@nestjs/common';
import { CreateMessageNotificationDto } from '../dtos/create-message-notification.dto';
import { ConsumeMessageNotificationDto } from '../dtos/consume-message-notification.dto';
import { NOTIFICATION_TYPE } from '@packages/common';

@Injectable()
export class ConsumerMessageMapper {
  public fromCreateMessageNotificationDto(notificationType: NOTIFICATION_TYPE, createmessageNotificationDto: CreateMessageNotificationDto): ConsumeMessageNotificationDto {
    const consumeMessageDto = new ConsumeMessageNotificationDto();
   
    consumeMessageDto.type = notificationType;
    consumeMessageDto.slug = createmessageNotificationDto.template;
    consumeMessageDto.status = createmessageNotificationDto.status;
    consumeMessageDto.user_id = createmessageNotificationDto.user_id;
    consumeMessageDto.tenant_id = createmessageNotificationDto.tenant_id;
    consumeMessageDto.language_code = createmessageNotificationDto.language_code;
    consumeMessageDto.recipient = createmessageNotificationDto.recipient_email;
    consumeMessageDto.contact = createmessageNotificationDto.recipient_contact;
    consumeMessageDto.device_id = createmessageNotificationDto.recipient_device_id;
    consumeMessageDto.scheduled_time = createmessageNotificationDto.scheduled_time;
    consumeMessageDto.in_app = createmessageNotificationDto.in_app;
    consumeMessageDto.notification_data = createmessageNotificationDto.notification_data;
    consumeMessageDto.meta_data = createmessageNotificationDto.meta_data;
    consumeMessageDto.title = createmessageNotificationDto.title;
    consumeMessageDto.message = createmessageNotificationDto.message;
    
    return consumeMessageDto;
  }
}
