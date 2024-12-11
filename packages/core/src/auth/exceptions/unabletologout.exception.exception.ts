// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableToLogoutException extends HttpException {
  constructor() {
    super('Unable to logout', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}