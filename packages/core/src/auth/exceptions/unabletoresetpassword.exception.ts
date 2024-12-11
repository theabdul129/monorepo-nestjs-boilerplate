// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableToResetPasswordException extends HttpException {
  constructor() {
    super('Unable to reset password', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

