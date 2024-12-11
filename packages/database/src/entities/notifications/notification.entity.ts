import {
  Table,
  Column,
  DataType,
  DefaultScope,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { NotificationTemplateEntity } from './notification-template.entity';

@DefaultScope(() => ({
  attributes: NotificationEntity.attributes()
}))
@Table(TableOptions(TABLE.NOTIFICATION, { paranoid: true }))
export class NotificationEntity extends Model<NotificationEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the notification.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the template.'
  })
  @ForeignKey(() => NotificationTemplateEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  template_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  user_id?: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the tenant.'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  tenant_id?: number;

  @ApiProperty({
    example: 'en',
    description: 'The language code of the notification.'
  })
  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  language_code!: string;

  @ApiProperty({
    example: 'ref123456',
    description: 'The external reference ID of the notification.'
  })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  external_reference_id?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The recipient of the notification (email, phone number, device ID).'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  recipient!: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'The status of the notification.'
  })
  @Column({
    type: DataType.ENUM('PENDING', 'SENT', 'FAILED'),
    allowNull: false
  })
  status!: 'PENDING' | 'SENT' | 'FAILED';

  @ApiProperty({
    example: 'Failed to send due to network error',
    description: 'The error message of the notification (if any).'
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  error_message?: string;

  @ApiProperty({
    example: new Date(),
    description: 'The scheduled time for the notification.'
  })
  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  scheduled_time?: Date;

  @ApiProperty({
    example: { "key": "value" },
    description: 'The data associated with the notification.'
  })
  @Column({
    type: DataType.JSON,
    allowNull: true
  })
  notification_data?: any;

  @ApiProperty({
    example: { "key": "value" },
    description: 'Additional metadata for the notification.'
  })
  @Column({
    type: DataType.JSON,
    allowNull: true
  })
  meta_data?: any;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the notification.'
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_on!: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The last update date of the notification.'
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updated_on!: Date;

  @BelongsTo(() => NotificationTemplateEntity)
  template!: NotificationTemplateEntity;

  static attributes(): string[] {
    return [
      'id',
      'template_id',
      'user_id',
      'tenant_id',
      'language_code',
      'external_reference_id',
      'recipient',
      'status',
      'error_message',
      'scheduled_time',
      'notification_data',
      'meta_data',
      'created_on',
      'updated_on'
    ];
  }
}
