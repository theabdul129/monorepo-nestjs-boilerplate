import {
  Table,
  Column,
  Model,
  DataType,
  DefaultScope,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TableOptions } from '../../database.util';
import { TABLE } from '../../database.constant';

@DefaultScope(() => ({
  attributes: AssetEntity.attributes(),
}))
@Table(TableOptions(TABLE.MDS_ASSET, { paranoid: true }))
export class AssetEntity extends Model<AssetEntity> {
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

  @ApiProperty({ description: 'Name of the asset', example: 'Sample Asset' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'asset_name',
  })
  asset_name?: string;

  @ApiProperty({ description: 'Type of the asset', example: 'Image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'asset_type',
  })
  asset_type!: string;

  @ApiProperty({ description: 'Size of the asset in bytes', example: 2048 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'asset_size',
  })
  asset_size?: number;

  @ApiProperty({ description: 'Format of the asset', example: 'jpg' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'asset_format',
  })
  asset_format?: string;

  @ApiProperty({ description: 'Storage type of the asset', example: 'URL' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'asset_storage_type',
  })
  asset_storage_type!: string;

  @ApiProperty({ description: 'Content of the asset', example: 'Base64 encoded content' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'asset_content',
  })
  asset_content!: string;

  @ApiProperty({ description: 'Metadata for the asset', example: '{ "author": "John Doe" }' })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
    field: 'meta',
  })
  meta?: object;

  @ApiProperty({ description: 'Indicates if the asset is global', example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_global',
  })
  is_global?: boolean;

  @ApiProperty({ description: 'Status of the asset', example: 'active' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'status',
  })
  status?: string;

  @ApiProperty({ description: 'Date when the asset was created', example: '2024-10-27T00:00:00.000Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created_on',
  })
  created_on?: Date;

  @ApiProperty({ description: 'Date when the asset was last updated', example: '2024-10-27T00:00:00.000Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updated_on',
  })
  updated_on?: Date;

  @ApiProperty({ description: 'Date when the asset was deleted', example: '2024-10-27T00:00:00.000Z' })
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
      'asset_name',
      'asset_type',
      'asset_size',
      'asset_format',
      'asset_storage_type',
      'asset_content',
      'is_global',
      'status',
      'created_on',
      'updated_on',
    ];
  }
}
