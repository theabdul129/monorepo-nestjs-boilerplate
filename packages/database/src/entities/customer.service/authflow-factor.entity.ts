import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  DefaultScope,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { AuthFlowEntity } from './authflow.entity';
import { FactorEntity } from './factor.entity';

@DefaultScope(() => ({
  attributes: AuthFlowFactorEntity.attributes()
}))
@Table(TableOptions(TABLE.AUTH_FLOW_FACTOR, { paranoid: true }))
export class AuthFlowFactorEntity extends Model<AuthFlowFactorEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the auth flow factor.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => AuthFlowEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  auth_flow_id!: number;

  @ForeignKey(() => FactorEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  factor_id!: number;

  @ApiProperty({
    example: 1,
    description: 'The position of the factor within the auth flow.'
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  position!: number;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the auth flow factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The updated date of the auth flow factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the auth flow factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @BelongsTo(() => AuthFlowEntity)
  auth_flow!: AuthFlowEntity;

  @BelongsTo(() => FactorEntity)
  factor!: FactorEntity;
  
  static attributes(): string[] {
    return [
      'id',
      'auth_flow_id',
      'factor_id',
      'position',
      'created_on',
      'updated_on',
      'deleted_on',
    ];
  }
}
