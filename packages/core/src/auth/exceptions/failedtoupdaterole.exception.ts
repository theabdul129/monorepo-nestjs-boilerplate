// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToUpdateRoleException extends HttpException {
  constructor() {
    super('An unexpected error occurred during role update.', HttpStatus.BAD_REQUEST);
  }
}
