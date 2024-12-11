import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@packages/common';

export class UserAlreadyExistsException extends ApiException {
  constructor() {
    super('USER_ALREADY_EXISTS', 'User Already Exists','User Already Exists', HttpStatus.UNAUTHORIZED);
  }
}