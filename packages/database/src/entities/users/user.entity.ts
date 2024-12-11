import {
  Table,
  Column,
  DataType,
  DefaultScope,
  Model
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';


@DefaultScope(() => ({
  attributes: UserEntity.attributes()
}))
@Table(TableOptions(TABLE.USER, { paranoid: true }))
export class UserEntity extends Model<UserEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user.'
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.'
  })
  @Column({ type: DataType.STRING(100), allowNull: true })
  first_name!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.'
  })
  @Column({ type: DataType.STRING(100), allowNull: true })
  last_name!: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user.'
  })
  @Column({ type: DataType.STRING(127), allowNull: false })
  email!: string;


  @ApiProperty({
    example: '1234567890',
    description: 'The contact number of the user.'
  })
  @Column({ type: DataType.STRING(17), allowNull: true })
  contact_no!: string;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the user.'
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  @ApiProperty({
    example: 'Deleted Admin',
    description: 'The name of the user who deleted the user.'
  })
  @Column({ type: DataType.STRING(255), allowNull: true })
  deleted_by?: string;

  static attributes(): string[] {
    return [
      'id',
      'first_name',
      'last_name',
      'email',
      'contact_no',
      'created_on',
      'created_by',
      'updated_on',
      'updated_by'
    ];
  }
}
