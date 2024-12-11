import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@packages/common';
export class UserNotFoundException extends ApiException {
  constructor(id?: number | string) {
    super(
      'USER_NOT_FOUND',
      'User not found',
      `User not found with [${id}]`,
      HttpStatus.NOT_FOUND,
    );
  }
}
