import {
  Table,
  Column,
  Model,
  DataType,
  DefaultScope,
  HasOne,
  Scopes,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TableOptions } from '../../database.util';
import { TABLE } from '../../database.constant';
import { ReferenceEntity } from './reference.entity';

@DefaultScope(() => ({
  attributes: TenantEntity.attributes(),
}))
@Scopes(() => TenantEntity.scopes())
@Table(TableOptions(TABLE.MDS_TENANT, { paranoid: true }))
export class TenantEntity extends Model<TenantEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the tenant.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 'ABC Corp',
    description: 'The name of the tenant.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @ApiProperty({
    example: 'abc-corp',
    description: 'A unique identifier for the tenant.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: "URL of the tenant's logo.",
  })
  @Column({
    type: DataType.STRING,
  })
  logo_url!: string;

  @ApiProperty({
    example: 'en',
    description:
      'Default language code for the tenant. Possible values are en, ar, fr, bn.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  default_language_code!: string;

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

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'privacy_policy',
    scope: {
      slug: 'privacy_policy',
    },
  })
  privacy_policy?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'terms_conditions',
    scope: {
      slug: 'terms_conditions',
    },
  })
  terms_conditions?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'supported_languages',
    scope: {
      slug: 'supported_languages',
    },
  })
  supported_languages?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'faqs',
    scope: {
      slug: 'faqs',
    },
  })
  faqs?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'contact_info',
    scope: {
      slug: 'contact_info',
    },
  })
  contact_info?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'customer_password_policy',
    scope: {
      slug: 'customer_password_policy',
    },
  })
  customer_password_policy?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'otp_setting',
    scope: {
      slug: 'otp_setting',
    },
  })
  otp_setting?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'phone_number_policy',
    scope: {
      slug: 'phone_number_policy',
    },
  })
  phone_number_policy?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'logo',
    scope: {
      slug: 'logo',
    },
  })
  logo?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'favicon',
    scope: {
      slug: 'favicon',
    },
  })
  favicon?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'tag_line',
    scope: {
      slug: 'tag_line',
    },
  })
  tag_line?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'mobile_theme',
    scope: {
      slug: 'mobile_theme',
    },
  })
  mobile_theme?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'mobile_font_styling',
    scope: {
      slug: 'mobile_font_styling',
    },
  })
  mobile_font_styling?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'workflow_config',
    scope: {
      slug: 'workflow_config',
    },
  })
  workflow_config?: ReferenceEntity;

  @HasOne(() => ReferenceEntity, {
    foreignKey: 'tenant_id',
    as: 'mobile_loader',
    scope: {
      slug: 'mobile_loader',
    },
  })
  mobile_loader?: ReferenceEntity;

  static scopes(scope: string | null = null) {
    const scopes: any = {
      full360: {
        attributes: TenantEntity.attributes(),
        include: [
          {
            model: ReferenceEntity,
            as: 'customer_password_policy',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },

          {
            model: ReferenceEntity,
            as: 'phone_number_policy',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'otp_setting',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'privacy_policy',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'faqs',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'supported_languages',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'terms_conditions',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'contact_info',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'favicon',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'logo',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'tag_line',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'mobile_font_styling',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'mobile_theme',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'workflow_config',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
          {
            model: ReferenceEntity,
            as: 'mobile_loader',
            attributes: ReferenceEntity.attributes(),
            required: false,
          },
        ],
      },
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): string[] {
    return [
      'id',
      'name',
      'slug',
      'logo_url',
      'default_language_code',
      'status',
      'created_on',
      'updated_on',
    ];
  }
}
