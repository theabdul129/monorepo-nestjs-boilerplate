import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  [x: string]: any;
  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: () => Object,
  })
  readonly data: T[];

  constructor(data: T[], meta: PageMetaDto) {
    this.meta = meta;
    this.data = data;
  }
}
