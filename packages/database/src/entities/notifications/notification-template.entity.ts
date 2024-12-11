import {
  Table,
  Column,
  DataType,
  DefaultScope,
  Model
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';

@DefaultScope(() => ({
  attributes: NotificationTemplateEntity.attributes()
}))
@Table(TableOptions(TABLE.NOTIFICATION_TEMPLATE, { paranoid: true }))
export class NotificationTemplateEntity extends Model<NotificationTemplateEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the notification template.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 'EMAIL',
    description: 'The type of notification.'
  })
  @Column({
    type: DataType.ENUM('EMAIL', 'SMS', 'PUSH'),
    allowNull: false
  })
  notification_type!: 'EMAIL' | 'SMS' | 'PUSH';

  @ApiProperty({
    example: 'SLUG',
    description: 'The slug for the template.'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  slug!: string;

  @ApiProperty({
    example: 'en',
    description: 'The language code of the notification template.'
  })
  @Column({
    type: DataType.STRING(5),
    allowNull: false
  })
  language_code!: string;

  @ApiProperty({
    example: 'Welcome to our service',
    description: 'The subject of the notification template (only for email notifications).'
  })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  subject?: string;

  @ApiProperty({
    example: 'Your registration is complete.',
    description: 'The body of the notification template.'
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  body!: string;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the notification template.'
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_on!: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The last update date of the notification template.'
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updated_on!: Date;

  static attributes(): string[] {
    return [
      'id',
      'notification_type',
      'slug',
      'language_code',
      'subject',
      'body',
      'created_on',
      'updated_on'
    ];
  }
}
