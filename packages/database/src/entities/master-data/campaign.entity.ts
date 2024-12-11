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
  attributes: CampaignEntity.attributes(),
}))
@Table(TableOptions(TABLE.MDS_CAMPAIGN, { paranoid: true }))
export class CampaignEntity extends Model<CampaignEntity> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the campaign.',
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
    example: 'Splash Screen',
    description: 'The screen type for the campaign.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  campaign_type!: string;

  @ApiProperty({
    example: 1,
    description: 'The screen position during the campaign.',
  })
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  position!: number;

  @ApiProperty({
    example: 'Intro campaign',
    description: 'The campaign title.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  title!: string;

  @ApiProperty({
    example: 'Campaign description',
    description: 'The description of the campaign.',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  description!: string;

  @ApiProperty({
    example: 'Campaign description',
    description: 'The image of the campaign.',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image!: string;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The timestamp when the campaign starts.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date!: Date;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The timestamp when the campaign ends.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date!: Date;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The timestamp when the campaign was created.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_on!: Date;

  @ApiProperty({
    example: '2024-08-01T00:00:00Z',
    description: 'The timestamp when the campaign was last updated.',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_on!: Date;

  @Column({
    type: DataType.DATE,
    allowNull :true
  })
  deleted_on?: Date;


  // Static method to return attribute names
  static attributes(): string[] {
    return [
      'id',
      'tenant_id',
      'campaign_type',
      'position',
      'title',
      'description',
      'image',
      'start_date',
      'end_date',
      'created_on',
      'updated_on',
    ];
  }
}
