import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: ['desc', 'asc'], default: 'asc' })
  @IsOptional()
  readonly order_by?: 'DESC';

  @ApiPropertyOptional({ default: 'updated_on' })
  @IsOptional()
  @IsString()
  readonly order_key?: 'updated_on';

  @ApiPropertyOptional({
    default: '',
    description: 'Search query',
  })
  @IsString()
  @IsOptional()
  readonly search?: string = '';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 200,
    default: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  @IsOptional()
  readonly pageSize?: number = 50;

  @IsOptional()
  @Transform(({ value }) => ['true', true, 1].includes(value))
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    default: true,
  })
  readonly pagination?: boolean = true;
}
