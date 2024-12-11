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
  import { NotificationEntity } from './notification.entity'; // Adjust the import path according to your project structure
  
  @DefaultScope(() => ({
    attributes: InAppNotificationEntity.attributes()
  }))
  @Table(TableOptions(TABLE.IN_APP_NOTIFICATION, { paranoid: true }))
  export class InAppNotificationEntity extends Model<InAppNotificationEntity> {
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the in-app notification.'
    })
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the user.'
    })
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    user_id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the notification.'
    })
    @ForeignKey(() => NotificationEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: true
    })
    notification_id?: number;
  
    @ApiProperty({
      example: 'Welcome',
      description: 'The title of the in-app notification.'
    })
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    title!: string;
  
    @ApiProperty({
      example: 'Your registration is complete.',
      description: 'The message of the in-app notification.'
    })
    @Column({
      type: DataType.TEXT,
      allowNull: false
    })
    message!: string;
  
    @ApiProperty({
      example: false,
      description: 'Indicates whether the notification has been read.'
    })
    @Column({
      type: DataType.BOOLEAN,
      defaultValue: false
    })
    is_read!: boolean;
  
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
      description: 'The creation date of the in-app notification.'
    })
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW
    })
    created_on!: Date;
  
    @ApiProperty({
      example: new Date(),
      description: 'The last update date of the in-app notification.'
    })
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW
    })
    updated_on!: Date;
  
    @BelongsTo(() => NotificationEntity)
    notification!: NotificationEntity;
  
    static attributes(): string[] {
      return [
        'id',
        'user_id',
        'notification_id',
        'title',
        'message',
        'is_read',
        'meta_data',
        'created_on',
        'updated_on'
      ];
    }
  }
  