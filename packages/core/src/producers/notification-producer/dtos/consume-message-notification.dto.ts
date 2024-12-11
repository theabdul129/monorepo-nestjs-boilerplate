import { ApiProperty } from '@nestjs/swagger';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@packages/common';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
  IsJSON,
} from 'class-validator';


export class ConsumeMessageNotificationDto {
  @ApiProperty({
    type: String,
    enum: NOTIFICATION_TYPE,
    example: NOTIFICATION_TYPE.EMAIL,
    description: 'The type of notification.'
  })
  @IsEnum(NOTIFICATION_TYPE)
  @IsNotEmpty()
  type!: NOTIFICATION_TYPE;

  @ApiProperty({
    type: String,
    example: 'welcome-email-en',
    description: 'Unique identifer to identify the email template',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug!: string;

  @ApiProperty({
    type: String,
    enum: NOTIFICATION_STATUS,
    example: NOTIFICATION_STATUS.PENDING,
    description: 'The status of notification.'
  })
  @IsEnum(NOTIFICATION_STATUS)
  @IsNotEmpty()
  status!: NOTIFICATION_STATUS;

  @ApiProperty({
    type: Number,
    example: 123,
    description: 'The ID of the user receiving the notification.',
  })
  @IsInt()
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({
    type: Number,
    example: 456,
    description: 'The ID of the tenant associated with the notification.',
  })
  @IsInt()
  @IsOptional()
  tenant_id?: number;

  @ApiProperty({
    type: String,
    example: 'en',
    description: 'The language code for the notification content.',
    default: 'ar'
  })
  @IsString()
  @MaxLength(5)
  @IsOptional()
  @Transform(({ value }) => value || 'ar')
  language_code?: string = 'ar';

  @ApiProperty({
    type: String,
    example: 'recipient@example.com',
    description: 'The email id for the recipient.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  recipient?: string;

  @ApiProperty({
    type: String,
    example: '923333333333',
    description: 'The contact number for the recipient.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contact?: string;

  @ApiProperty({
    type: String,
    example: '111111111',
    description: 'The device id for the recipient.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  device_id?: string;

  @ApiProperty({
    type: String,
    example: '2024-07-30T12:00:00Z',
    description: 'The scheduled time for the notification.',
  })
  @IsDateString()
  @IsOptional()
  scheduled_time?: Date;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Indicates if the notification is an in-app notification.',
    default: false
  })
  @IsBoolean()
  @IsOptional()
  in_app?: boolean = false;

  @ApiProperty({
    type: Object,
    description: 'The data associated with the notification.',
  })
  @IsJSON()
  @IsOptional()
  notification_data?: any;

  @ApiProperty({
    type: Object,
    description: 'Metadata associated with the notification.',
  })
  @IsJSON()
  @IsOptional()
  meta_data?: any;
  
  @ApiProperty({ example: 1, description: 'The notification template id' })
  @IsOptional()
  @IsInt()
  template_id?: number;

  @ApiProperty({ example: 'Welcome', description: 'The title of the in-app notification.' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Your registration is complete.', description: 'The message of the in-app notification.' })
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsInt()
  notification_id?: number;
}
