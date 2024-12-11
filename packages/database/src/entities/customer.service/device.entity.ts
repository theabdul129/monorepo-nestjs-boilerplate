import {
  Table,
  Column,
  DataType,
  Model,
  DefaultScope,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { CustomerEntity } from './customer.entity';

@DefaultScope(() => ({
  attributes: DeviceEntity.attributes()
}))
@Table(TableOptions(TABLE.DEVICE, { paranoid: true }))
export class DeviceEntity extends Model<DeviceEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the device.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user associated with the device.'
  })
  @ForeignKey(() => CustomerEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  customer_id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true 
  })
  tenant_id: number | undefined;

  @ApiProperty({
    example: '11111',
    description: 'The unique id of the device.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  device_id!: string;

  @ApiProperty({
    example: 'John\'s iPhone',
    description: 'The name of the device.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  device_name!: string;

  @ApiProperty({
    example: 'iPhone',
    description: 'The type of the device.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  device_type!: string;

  @ApiProperty({
    example: 'iOS',
    description: 'The operating system of the device.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  operating_system!: string;

  @ApiProperty({
    example: '14.4',
    description: 'The version of the operating system.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  os_version!: string;

  @ApiProperty({
    example: '1.2.3',
    description: 'The version of the application installed on the device.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  app_version!: string;

  @ApiProperty({
    example: 'some-push-token',
    description: 'The push notification token for the device.'
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  push_token!: string;

  @ApiProperty({
    example: new Date(),
    description: 'The last active time of the device.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  last_active_at?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the device.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The updated date of the device.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the device.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  static attributes(): string[] {
    return [
      'id',
      'customer_id',
      'device_name',
      'device_type',
      'operating_system',
      'os_version',
      'app_version',
      'push_token',
      'last_active_at',
      'created_on',
      'updated_on',
      'deleted_on',
    ];
  }
}
