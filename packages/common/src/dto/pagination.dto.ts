import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDTO {
  @ApiProperty({
    example: 50,
    description: 'Number of records per page',
    required: false,
    type: 'number',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    example: 5,
    description: 'Current page number',
    required: false,
    type: 'number',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page?: number;
}
