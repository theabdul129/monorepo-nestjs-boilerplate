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
  permission_name!: string;

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
export class UpdateRoleDTO {
  @IsNotEmpty()
  @IsString()
  current_name!: string;

  @IsOptional()
  @IsString()
  new_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  // @ArrayMinSize(1)
  permissions!: PermissionDTO[];
}
