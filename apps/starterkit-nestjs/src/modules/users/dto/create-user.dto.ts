import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'Faizan',
    description: 'The first name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly first_name: string;

  @ApiProperty({
    type: String,
    example: 'Ahmad',
    description: 'The last name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly last_name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'faizan@example.com',
    description: 'The email of the user.',
  })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  readonly email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The contact number of the user',
  })
  @IsOptional()
  @IsString()
  readonly contact_no: string;
}
