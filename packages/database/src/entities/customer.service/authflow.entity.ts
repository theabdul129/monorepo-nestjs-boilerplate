import {
  Table,
  Column,
  DataType,
  Model,
  DefaultScope,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { AuthFlowFactorEntity } from './authflow-factor.entity';
import { FactorEntity } from './factor.entity';

@DefaultScope(() => ({
  attributes: AuthFlowEntity.attributes()
}))
@Table(TableOptions(TABLE.AUTH_FLOW, { paranoid: true }))
export class AuthFlowEntity extends Model<AuthFlowEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the auth flow.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 'Login',
    description: 'The name of the auth flow.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true 
  })
  tenant_id: number | undefined;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the auth flow is active.'
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false
  })
  is_active!: boolean;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the auth flow.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The updated date of the auth flow.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the auth flow.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @HasMany(() => AuthFlowFactorEntity)
  auth_flow_factors!: AuthFlowFactorEntity[];

  @BelongsToMany(() => FactorEntity, () => AuthFlowFactorEntity)
  factors?: FactorEntity[];

  static attributes(): string[] {
    return [
      'id',
      'name',
      'is_active',
      'created_on',
      'updated_on',
      'deleted_on'
    ];
  }
}
