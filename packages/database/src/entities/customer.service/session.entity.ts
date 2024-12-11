import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  DefaultScope,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { randomBytes } from 'crypto';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { AuthFlowEntity } from './authflow.entity';
import { DeviceEntity } from './device.entity';
import { FactorEntity } from './factor.entity';
import { CustomerEntity } from './customer.entity';

@DefaultScope(() => ({
  attributes: SessionEntity.attributes(),
}))
@Table(TableOptions(TABLE.SESSION, { paranoid: true }))
export class SessionEntity extends Model<SessionEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the session.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => FactorEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  next_factor_id?: number;

  @ApiProperty({
    example: 'Partial',
    description: 'The status of the session.',
  })
  @Column({
    type: DataType.STRING(100),
    defaultValue: 'Partial',
    allowNull: false,
  })
  status!: string;

  @ApiProperty({
    example: 'some-token',
    description: 'The reference token for the session.',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  reference_token?: string;

  @ApiProperty({
    example: 'RSA Public Key',
    description: 'Public Key of the session',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public_key?: string;

  @ForeignKey(() => AuthFlowEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authflow_id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenant_id: number | undefined;

  @ForeignKey(() => DeviceEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  device_id!: number;

  @ForeignKey(() => CustomerEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  customer_id!: number;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the session.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The updated date of the session.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the session.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @BelongsTo(() => FactorEntity)
  factor!: FactorEntity;

  @BelongsTo(() => AuthFlowEntity)
  authflow!: AuthFlowEntity;

  @BelongsTo(() => DeviceEntity)
  device!: DeviceEntity;

  @BelongsTo(() => CustomerEntity)
  customer!: CustomerEntity;

  @BeforeCreate({ name: 'setReferenceToken' })
  static async setReferenceToken(instance: SessionEntity) {
    instance.reference_token = randomBytes(32).toString('hex');
  }

  @BeforeUpdate({ name: 'SetCustomerLastDevice' })
  static async SetCustomerLastDevice(instance: SessionEntity) {
    if (instance.changed('status') && instance.status === 'ACTIVE') {
      await CustomerEntity.update(
        { last_device_id: instance.device_id },
        { where: { id: instance.customer_id } },
      );
    }
  }

  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'next_factor_id',
      'status',
      'reference_token',
      'public_key',
      'authflow_id',
      'device_id',
      'customer_id',
      'created_on',
      'updated_on',
      'deleted_on',
    ];
  }
}
