import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';


export class KeyCloakCreateUserDto {
  @ApiProperty({
    type: String,
    example: "The username of the keycloak user",
    description: 'The type of notification.'
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    type: String,
    example: '********',
    description: 'The password for the user',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    type: String,
    example: "Faisal",
    description: 'The first name of the user.',
  })
  @IsString()
  first_name?: string;

  @ApiProperty({
    type: String,
    example: "Nasir",
    description: 'The last name of the user.',
  })
  @IsString()
  last_name?: string;

  
  @ApiProperty({
    type: String,
    example: "recipient@recipient.com",
    description: 'The email of the user.',
  })
  @IsString()
  email?: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'The status of user either enabled or disabled.',
  })
  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true;
}