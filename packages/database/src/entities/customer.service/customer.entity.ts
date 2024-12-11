import {
  Table,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Scopes,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { DeviceEntity } from './device.entity';
import { CompanyEntity } from './company.entity';
import { PaginatedModel } from '../../pagination.model';

@DefaultScope(() => ({
  attributes: CustomerEntity.attributes(),
}))
@Scopes(() => CustomerEntity.scopes())
@Table(TableOptions(TABLE.CUSTOMER, { paranoid: true }))
export class CustomerEntity extends PaginatedModel<CustomerEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the customer.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the tenant to which the customer belongs.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  tenant_id: number | undefined;

  @ForeignKey(() => DeviceEntity)
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the last device used by the customer.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  last_device_id?: number;

  @ApiProperty({
    example: 'EXT123456',
    description: 'An external reference identifier for the customer.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  external_reference_id: string | undefined;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the customer.',
  })
  @Column({ type: DataType.JSONB, allowNull: true })
  first_name!: JSON;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the customer.',
  })
  @Column({ type: DataType.JSONB, allowNull: true })
  last_name!: JSON;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the customer.',
  })
  @Column({ type: DataType.JSONB, allowNull: true })
  full_name!: JSON;

  @ApiProperty({
    example: 1234567890,
    description: 'The national identification number of the customer.',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  national_id!: number;

  @ApiProperty({
    example: '2025-12-31',
    description: 'The expiry date of the national identification for the customer.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  national_id_expiry!: Date;

  @ApiProperty({
    example: '2020-01-01',
    description: 'The issue date of the national identification for the customer.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  national_id_issue_date!: Date;

  @ApiProperty({
    example: 'SA',
    description: 'The nationality code of the customer.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nationality_code!: string;

  @ApiProperty({
    example: 'Saudi Arabia',
    description: 'The nationality name of the customer.',
  })
  @Column({ type: DataType.JSONB, allowNull: true })
  nationality_name!: JSON;

  @ApiProperty({
    example: 'AUTH123456',
    description: 'The authentication user ID for the customer.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  auth_user_id!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the customer.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  email!: string;

  @ApiProperty({
    example: 'M',
    description: 'The gender of the customer.',
  })
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  gender!: string;

  @ApiProperty({
    example: '+966501234567',
    description: 'The contact number of the customer.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  contact_no!: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'The date of birth of the customer.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  date_of_birth!: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the customer is AML verified.',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_aml_verified?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the customer email is verified.',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_email_verified?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the customer contact number is verified.',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_contact_verified?: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the customer has completed onboarding.',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  })
  is_onboarded?: boolean;

  @ApiProperty({
    example: 'active',
    description: 'The status of the customer.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status?: string;

  @ApiProperty({
    example: 'en',
    description: 'The preferred language of the customer.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  preferred_language?: string;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the customer record.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The last updated date of the customer record.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the customer record, if deleted.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @HasMany(() => CompanyEntity)
  companies!: CompanyEntity[];
  
  static scopes(scope: string | null = null) {
    const scopes: any = {
      full360: {
        attributes: CustomerEntity.attributes(),
        include: [
          {
            model: CompanyEntity,
            as: 'companies',
            required: false
          }
        ]
      }
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'last_device_id',
      'external_reference_id',
      'first_name',
      'last_name',
      'full_name',
      'national_id',
      'national_id_expiry',
      'national_id_issue_date',
      'nationality_code',
      'nationality_name',
      'gender',
      'auth_user_id',
      'email',
      'contact_no',
      'date_of_birth',
      'is_aml_verified',
      'is_email_verified',
      'is_onboarded',
      'is_contact_verified',
      'status',
      'preferred_language',
      'created_on',
      'updated_on',
      'deleted_on',
    ];
  }
}
