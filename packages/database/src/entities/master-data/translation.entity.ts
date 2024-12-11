import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement, 
    
 } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { TableOptions } from '../../database.util';
  import { TABLE } from '../../database.constant';

  @Table(TableOptions(TABLE.MDS_TRANSLATION, { paranoid: true }))
  export class TranslationEntity extends Model<TranslationEntity> {
    
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the translation entry.',
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
      example: 'LOGIN',
      description: 'The key name for the translation entry.',
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    key_name!: string;
  
    @ApiProperty({
      example: '{ "mobile": "en" }',
      description: 'The platform for the translation, stored as JSON.',
    })
    @Column({
      type: DataType.JSONB,
      allowNull: true,
    })
    platform?: object;
  
    @ApiProperty({
      example: '{ "en": "Login", "ar": "تسجيل الدخول" }',
      description: 'The translation data for different languages, stored as JSON.',
    })
    @Column({
      type: DataType.JSONB,
      allowNull: false,
    })
    translations!: object;
  
    @ApiProperty({
      example: '2024-08-01T00:00:00Z',
      description: 'The timestamp when the translation entry was created.',
    })
    @Column({
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    })
    created_on!: Date;
  
    @ApiProperty({
      example: '2024-08-01T00:00:00Z',
      description: 'The timestamp when the translation entry was last updated.',
    })
    @Column({
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    })
    updated_on!: Date;
  
  
   // Static method to return attribute names
    //    static attributes(): string[] {
    //     return [
    //       'id',
    //       'tenant_id',
    //       'key_name',
    //       'platform',
    //       'translations',
    //       'created_at',
    //       'updated_at',
    //     ];
    //   }
    
  }
  