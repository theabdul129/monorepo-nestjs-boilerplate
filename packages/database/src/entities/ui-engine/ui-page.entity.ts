import {
  Table,
  Column,
  DataType,
  Model,
  DefaultScope,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TABLE } from '../../database.constant';
import { TableOptions } from '../../database.util';

@DefaultScope(() => ({
  attributes: UIPageEntity.attributes(),
}))
@Table(TableOptions(TABLE.UI_PAGE, { paranoid: true }))
export class UIPageEntity extends Model<UIPageEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the UI page.',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: 'The tenant ID associated with the UI page.',
  })
  @Column({
    type: DataType.INTEGER,
  })
  tenant_id!: number;

  @ApiProperty({
    example: 'Home Page',
    description: 'The name of the UI page.',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @ApiProperty({
    example: 'home-page',
    description: 'The slug of the UI page.',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  slug!: string;

  @ApiProperty({
    example: '{"title": "Welcome to Home Page"}',
    description: 'The content of the UI page in JSON format.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  content!: object;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the UI page.',
  })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  created_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The last update date of the UI page.',
  })
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  updated_on?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The deletion date of the UI page.',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_on?: Date;

  static attributes(): string[] {
    return [
      'id', 
      'tenant_id', 
      'name', 
      'slug', 
      'content', 
      'created_on', 
      'updated_on', 
      'deleted_on'
    ];
  }
}
