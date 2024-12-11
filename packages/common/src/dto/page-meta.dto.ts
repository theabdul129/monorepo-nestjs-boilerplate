import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PageMetaDto {
  @ApiProperty()
  @IsOptional()
  readonly page?: number;

  @ApiProperty()
  @IsOptional()
  readonly pageSize?: number;

  @ApiProperty()
  @IsOptional()
  readonly total?: number;

  @ApiProperty()
  @IsOptional()
  readonly pages?: number;
}
