import {
  Table,
  Column,
  DataType,
  Model,
  DefaultScope,
  BelongsToMany,
  HasMany,
  HasOne,
  Scopes
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';
import { AuthFlowFactorEntity } from './authflow-factor.entity';
import { AuthFlowEntity } from './authflow.entity';

@DefaultScope(() => ({
  attributes: FactorEntity.attributes()
}))
@Scopes(() => FactorEntity.scopes())
@Table(TableOptions(TABLE.FACTOR, { paranoid: true }))
export class FactorEntity extends Model<FactorEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the factor.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 'OTP',
    description: 'The action associated with the factor.'
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  action!: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the factor is active.'
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false
  })
  is_active!: boolean;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The updated date of the factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the factor.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @HasMany(() => AuthFlowFactorEntity)
  auth_flow_factors!: AuthFlowFactorEntity[];

  @HasOne(() => AuthFlowFactorEntity)
  auth_flow_factor!: AuthFlowFactorEntity;

  @BelongsToMany(() => AuthFlowEntity, () => AuthFlowFactorEntity)
  auth_flow!: AuthFlowEntity;

  static scopes(scope: string | null = null) {
    const scopes: any = {
      full360: {
        attributes: FactorEntity.attributes(),
        include: [
          {
            model: AuthFlowFactorEntity,
            as: 'auth_flow_factors',
            attributes: AuthFlowFactorEntity.attributes(),
            required: false,
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
    return ['id', 'action', 'is_active', 'created_on', 'updated_on', 'deleted_on'];
  }
}
