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
  attributes: OTPSecretEntity.attributes()
}))
@Table(TableOptions(TABLE.OTP_SECRET, { paranoid: true }))
export class OTPSecretEntity extends Model<OTPSecretEntity> {
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  otp_secret!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  created_on!: Date;

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
      'otp_secret',
      'created_on',
      'updated_on',
    ];
  }
}
