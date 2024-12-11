import {
  Table,
  Column,
  DataType,
  DefaultScope,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TableOptions } from '../../database.util';
import { TABLE } from '../../database.constant';
import { PaginatedModel } from '../../pagination.model';

@DefaultScope(() => ({
  attributes: ChannelEntity.attributes(),
}))
@Table(TableOptions(TABLE.MDS_CHANNEL, { paranoid: true }))
export class ChannelEntity extends PaginatedModel<ChannelEntity> {
  @ApiProperty({ description: 'Primary key of the asset', example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @ApiProperty({ description: 'ID of the tenant', example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'tenant_id',
  })
  tenant_id!: number;

  @ApiProperty({ description: 'Name of the channel', example: 'DAEM-DEVELOPMENT' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name?: string;

  @ApiProperty({ description: 'Slug of the channel', example: 'daem-development' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'slug',
  })
  slug!: string;

  @ApiProperty({ description: 'Status of the channel', example: 'ACTIVE' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'status',
  })
  status?: string;

  @ApiProperty({ description: 'Date when the channel was created', example: '2024-10-27T00:00:00.000Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_on',
  })
  created_on?: Date;

  @ApiProperty({ description: 'Date when the channel was last updated', example: '2024-10-27T00:00:00.000Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_on',
  })
  updated_on?: Date;

  @ApiProperty({ description: 'Date when the channel was deleted', example: '2024-10-27T00:00:00.000Z' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deleted_on',
  })
  deleted_on?: Date;


  // Static method to return attribute names
  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'name',
      'slug',
      'status',
      'created_on',
      'updated_on',
    ];
  }
}
