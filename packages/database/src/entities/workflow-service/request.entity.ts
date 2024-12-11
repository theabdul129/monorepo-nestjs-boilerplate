import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  DefaultScope,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TableOptions } from '../../database.util';
import { TABLE } from '../../database.constant';

@DefaultScope(() => ({
  attributes: RequestEntity.attributes()
}))
@Table(TableOptions(TABLE.WF_REQUEST, { paranoid: true }))
export class RequestEntity extends Model<RequestEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the tenant.',
  })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenant_id?: number;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id?: number;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  application_id?: number;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  external_workflow_id!: string;

  @ApiProperty({
    example: 'MERCHANT_ONBOARDING',
    description: 'The process name of the workflow request.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  process_name!: string;

  @ApiProperty({
    description: 'Details of the dashboard Card.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  dashboard_card?: JSON;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  processing_status!: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'The status of the tenant.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The date and time when the tenant was created.',
  })

  @Column({
    type: DataType.DATE,
    allowNull: false,

  })
  created_on!: Date;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The date and time when the tenant was last updated.',
  })
  
  @Column({
    type: DataType.DATE,
    allowNull: false,

  })
  updated_on!: Date;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The date and time when the tenant was soft-deleted.',
  })
  
  @Column({
    type: DataType.DATE,
    allowNull: true,

  })
  deleted_on?: Date;


  static scopes(scope: string | null = null) {
    const scopes: Record<string, undefined> = {};
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'user_id',
      'application_id',
      'external_workflow_id',
      'process_name',
      'dashboard_card',
      'processing_status',
      'status',
      'created_on',
      'updated_on',
    ];
  }
}
