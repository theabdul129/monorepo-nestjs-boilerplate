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
    attributes: ReferenceEntity.attributes()
  }))
  @Table(TableOptions(TABLE.MDS_REFERENCE, { paranoid: true }))
  export class ReferenceEntity extends Model<ReferenceEntity> {
    
    @ApiProperty({
      example: 1,
      description: 'The unique identifier for the reference entry.',
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
      example: 'privacy_policy',
      description: 'The slug representing the type of reference (e.g., privacy_policy, terms_conditions).',
    })
    @Column({
      type: DataType.STRING(50),
      allowNull: false,
    })
    slug!: string;
  
    @ApiProperty({
      example: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
      description: 'The title of the reference entry in multiple languages, stored as JSON.',
    })
    @Column({
      type: DataType.JSONB,
      allowNull: false,
    })
    title!: JSON;
  
    @ApiProperty({
      example: { en: 'This is the privacy policy...', ar: 'هذه هي سياسة الخصوصية...' },
      description: 'The content of the reference entry in multiple languages, stored as JSON.',
    })
    @Column({
      type: DataType.JSONB,
      allowNull: false,
    })
    content!: JSON;
  
    @ApiProperty({
      example: '2024-08-01T00:00:00Z',
      description: 'The timestamp when the reference entry was created.',
    })
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    created_on!: Date;
  
    @ApiProperty({
      example: '2024-08-15T12:34:56Z',
      description: 'The timestamp when the reference entry was last updated.',
    })
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    updated_on!: Date;
    
    @ApiProperty({
      example: '2024-09-01T12:00:00Z',
      description: 'The timestamp when the reference entry was deleted. Null if not deleted.',
    })
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    deleted_on?: Date;
  
    static attributes(): string[] {
      return [
        'title',
        'content',
        'created_on',
        'updated_on',
      ];
    }
  }
  