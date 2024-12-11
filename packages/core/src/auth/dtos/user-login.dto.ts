import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class UserLoginDto {
  @ApiProperty({
    type: String
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly realm!: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly client_id!: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  readonly redirect_url!: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly code?: string;
}
