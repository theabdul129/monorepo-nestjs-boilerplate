import {
  Table,
  Column,
  DataType,
  DefaultScope,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { CustomerEntity } from './customer.entity'; // Assuming the customer entity path

@DefaultScope(() => ({
  attributes: CompanyEntity.attributes(),
}))
@Table(TableOptions(TABLE.COMPANY, { paranoid: true }))
export class CompanyEntity extends Model<CompanyEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the company.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: { en: 'Tech Corp', ar: 'شركة التقنية' },
    description: 'The name of the company in multiple languages.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  name?: JSON;

  @ApiProperty({
    example: '1234567890',
    description: 'The commercial registration number of the company.',
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  cr_number!: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The tax number of the company.',
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  tax_number?: string;

  @ApiProperty({
    example: '2020-01-01',
    description: 'The establishment date of the company.',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  establishment_date?: Date;

  @ApiProperty({
    example: '2020-01-01',
    description: 'The CR issue date of the company.',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  cr_issue_date?: Date;

  @ApiProperty({
    example: '2020-01-01',
    description: 'The CR expiry date of the company.',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  cr_expiry_date?: Date;

  @ApiProperty({
    example: 'LLC',
    description: 'The type of the company, e.g., LLC, Corporation, etc.',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  company_type?: string;

  @ApiProperty({
    example: 'LLC',
    description: 'The type of the company, e.g., LLC, Corporation, etc.',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  entity_type?: string;

  @ForeignKey(() => CustomerEntity)
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the owner (customer) of the company.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  owner_id?: number;

  @BelongsTo(() => CustomerEntity)
  owner?: CustomerEntity;

  @ApiProperty({
    example: 100000.00,
    description: 'The capital amount of the company in the specified currency.',
  })
  @Column({
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  capital_amount!: number;

  @ApiProperty({
    example: 'active',
    description: 'The status of the company.',
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: 'ACTIVE',
  })
  status!: string;

  @ApiProperty({
    example: 'info@techcorp.com',
    description: 'The email address of the company.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  })
  email?: string;

  @ApiProperty({
    example: '+966501234567',
    description: 'The contact phone number of the company.',
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone_number?: string;

  @ApiProperty({
    example: 'https://www.techcorp.com',
    description: 'The official website of the company.',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  website?: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the tenant to which the company belongs.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tenant_id!: number;

  @ApiProperty({
    example: { en: 'Tech Corp', ar: 'شركة التقنية' },
    description: 'The name of the company in multiple languages.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  business_activities?: JSON;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the company record was created.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_on!: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the company record was last updated.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_on!: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00Z',
    description: 'The date when the company record was deleted.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_on?: Date;

  @ApiProperty({
    example: 'system',
    description: 'The user who created the record.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  created_by?: string;

  @ApiProperty({
    example: 'admin',
    description: 'The user who last updated the record.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updated_by?: string;

  @ApiProperty({
    example: 'admin',
    description: 'The user who deleted the record.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deleted_by?: string;

  static attributes(): string[] {
    return [
      'id',
      'name',
      'cr_number',
      'tax_number',
      'cr_issue_date',
      'cr_expiry_date',
      'entity_type',
      'business_activities',
      'establishment_date',
      'company_type',
      'owner_id',
      'capital_amount',
      'status',
      'email',
      'phone_number',
      'website',
      'tenant_id',
      'created_on',
      'updated_on',
      'deleted_on',
      'created_by',
      'updated_by',
      'deleted_by',
    ];
  }
}
