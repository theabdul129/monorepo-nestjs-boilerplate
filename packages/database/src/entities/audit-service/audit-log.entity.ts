import {
  Table,
  Column,
  DataType,
} from 'sequelize-typescript';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { PaginatedModel } from '../../pagination.model'
@Table(TableOptions(TABLE.AUDIT_LOG))
export class AuditLogEntity extends PaginatedModel<AuditLogEntity> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({ type: DataType.STRING })
  correlation_id?: string;

  @Column(DataType.STRING)
  tenant_id?: string;

  @Column(DataType.STRING)
  tenant_slug?: string;

  @Column(DataType.STRING)
  channel_id?: string;

  @Column(DataType.STRING)
  channel_slug?: string;

  @Column(DataType.STRING)
  ip_address?: string;

  @Column(DataType.STRING)
  geo_location?: string;

  @Column(DataType.STRING)
  session_id?: string;

  @Column(DataType.STRING)
  auth_user_id?: string;

  @Column({ type: DataType.STRING })
  user_id?: string;

  @Column(DataType.STRING)
  user_type?: string;

  @Column(DataType.STRING)
  user_name?: string;

  @Column(DataType.STRING)
  role_id?: string;

  @Column(DataType.STRING)
  role_name?: string;

  @Column(DataType.STRING)
  service_name?: string;

  @Column(DataType.STRING)
  request_method?: string;

  @Column(DataType.STRING)
  request_url?: string;

  @Column(DataType.JSON)
  request_headers?: object;

  @Column(DataType.JSON)
  request_body?: object;

  @Column(DataType.STRING)
  response_status?: string;

  @Column(DataType.JSON)
  response_headers?: object;

  @Column(DataType.JSON)
  response_body?: object;

  @Column({ type: DataType.STRING })
  audit_code!: string;

  @Column(DataType.STRING)
  audit_text?: string;

  @Column({
    type: DataType.ENUM('S', 'F'),
    allowNull: false,
  })
  status!: 'S' | 'F';

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_on!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_on!: Date;


  static attributes(): string[] {
    return [
      'id',
      'correlation_id',
      'tenant_id',
      'tenant_slug',
      'channel_id',
      'channel_slug',
      'ip_address',
      'auth_user_id',
      'geo_location',
      'session_id',
      'user_id',
      'user_type',
      'user_name',
      'role_id',
      'role_name',
      'service_name',
      'request_method',
      'request_url',
      'request_body',
      'request_headers',
      'response_headers',
      'response_status',
      'response_body',
      'audit_code',
      'audit_text',
      'status',
      'created_on',
      'updated_on'
    ];
  }
}
