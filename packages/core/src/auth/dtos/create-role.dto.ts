import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

class PermissionDTO {  
  @IsNotEmpty()
  @IsString()
  resource_id!: string;

  @IsNotEmpty()
  @IsString()
  resource_name!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  scopes!: string[];
}
export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  permissions!: PermissionDTO[];
}
