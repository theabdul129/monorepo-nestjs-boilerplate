import {
  Table,
  Column,
  DataType,
  DefaultScope,
  Model,
} from 'sequelize-typescript';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';

@DefaultScope(() => ({
  attributes: OTPVerificationEntity.attributes()
}))
@Table(TableOptions(TABLE.OTP_VERIFICATION, { paranoid: true }))
export class OTPVerificationEntity extends Model<OTPVerificationEntity> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tenant_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  contact?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  otp_hash!: string;

  @Column({
    type: DataType.STRING(50),
  })
  scenario!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  attempts!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  locked_until!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_on!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expires_at!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updated_on!: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  static attributes(): string[] {
    return [
      'id',
      'user_id',
      'tenant_id',
      'status',
      'contact',
      'email',
      'otp_hash',
      'scenario',
      'attempts',
      'locked_until',
      'created_on',
      'expires_at',
      'updated_on',
    ];
  }
}
