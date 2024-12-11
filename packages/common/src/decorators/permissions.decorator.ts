import { SetMetadata } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

/**
 *
 * @param {...any} permissions
 */
export function Permissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden' })
  );
}
