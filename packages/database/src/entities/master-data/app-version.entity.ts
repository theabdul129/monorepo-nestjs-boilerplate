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
    attributes: AppVersionEntity.attributes()
  })) 
  @Table(TableOptions(TABLE.MDS_APP_VERSION, { paranoid: true }))
  export class AppVersionEntity extends Model<AppVersionEntity> {
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the app version entry.',
    })
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
    })
    id!: number;
  
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the tenant.',
    })
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    tenant_id!: number;
  
    @ApiProperty({
      example: '1.0.0',
      description: 'The current version of the mobile application.',
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    current_version!: string;
  
    @ApiProperty({
      example: '0.9.0',
      description: 'The minimum version required for the app to function.',
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    min_supported_version!: string;
  
    @ApiProperty({
      example: 'iOS',
      description: 'The platform identifier, e.g., "iOS", "Android".',
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    platform!: string;
  
    @ApiProperty({
      example: 'light',
      description: 'The theme setting for the mobile application.',
    })
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    update_url?: string;
  
    @ApiProperty({
      example: '2024-08-01T00:00:00Z',
      description: 'The timestamp when the app version entry was created.',
    })
    @Column({
      type: DataType.DATE,
      allowNull :false
    })
    created_on!: Date;
  
    @ApiProperty({
      example: '2024-08-01T00:00:00Z',
      description: 'The timestamp when the app version entry was last updated.',
    })

    @Column({
      type: DataType.DATE,
      allowNull :false

    })
    updated_on!: Date;


  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The timestamp when the app version entry was deleted.',
    })

    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    deleted_on?: Date;
  
    // Static method to return attribute names
    static attributes(): string[] {
      return [
        'id',
        'current_version',
        'min_supported_version',
        'platform',
        'update_url',
        'created_on',
        'updated_on',
      ];
    }
  }
  