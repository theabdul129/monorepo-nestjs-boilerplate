import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  DefaultScope,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TableOptions } from '../../database.util';
import { TABLE } from '../../database.constant';
import { PaginatedModel } from '../../pagination.model';

@DefaultScope(() => ({
  attributes: AdminUserEntity.attributes(),
}))
@Table(TableOptions(TABLE.ADM_ADMIN_USER, { paranoid: true }))
export class AdminUserEntity extends PaginatedModel<AdminUserEntity> {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ApiProperty()
  @Column(DataType.STRING)
  first_name!: string;

  @ApiProperty()
  @Column(DataType.INTEGER)
  tenant_id!: number;

  @ApiProperty()
  @Column(DataType.STRING)
  last_name!: string;

  @ApiProperty()
  @Column(DataType.STRING)
  middle_name?: string;

  @ApiProperty()
  @Column(DataType.STRING)
  email!: string;

  @ApiProperty()
  @Column(DataType.STRING)
  contact_number?: string;

  @ApiProperty()
  @Column(DataType.DATE)
  date_of_birth?: Date;

  @ApiProperty()
  @Column(DataType.STRING)
  gender?: string;

  @ApiProperty()
  @Column(DataType.STRING)
  preferred_language!: string;

  @ApiProperty()
  @Column(DataType.STRING)
  national_id!: string;

  @ApiProperty()
  @Column(DataType.STRING)
  nationality?: string;

  @ApiProperty()
  @Column(DataType.DATE)
  national_id_expiry?: Date;

  @ApiProperty()
  @Column(DataType.JSONB)
  roles?: string[];

  @ApiProperty()
  @Column(DataType.STRING)
  status!: string;

  @ApiProperty()
  @Column(DataType.STRING)
  invitation_token?: string;

  @ApiProperty()
  @Column(DataType.DATE)
  invitation_expiry_date?: Date;

  @ApiProperty()
  @Column(DataType.DATE)
  last_login_at?: Date;

  @ApiProperty()
  @Column(DataType.UUID)
  created_by?: string;

  @ApiProperty()
  @Column(DataType.UUID)
  updated_by?: string;

  @ApiProperty()
  @Column(DataType.UUID)
  deleted_by?: string;

  @ApiProperty()
  @Column(DataType.DATE)
  created_on!: Date;

  @ApiProperty()
  @Column(DataType.DATE)
  updated_on?: Date;

  @ApiProperty()
  @Column(DataType.DATE)
  deleted_on?: Date;

  @ApiProperty({
    example: 'AUTH123456',
    description: 'The authentication user ID for the customer.',
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  auth_user_id!: string;

  @ApiProperty()
  @Column(DataType.DATE)
  invitation_sent_at?: Date;

  static attributes(): string[] {
    return [
      'id',
      'first_name',
      'last_name',
      'middle_name',
      'email',
      'contact_number',
      'date_of_birth',
      'gender',
      'preferred_language',
      'national_id',
      'nationality',
      'national_id_expiry',
      'auth_user_id',
      'roles',
      'status',
      'invitation_token',
      'invitation_sent_at',
      'invitation_expiry_date',
      'last_login_at',
      'created_by',
      'updated_by',
      'deleted_by',
      'created_on',
      'updated_on',
      'deleted_on',
    ];
  }
}
