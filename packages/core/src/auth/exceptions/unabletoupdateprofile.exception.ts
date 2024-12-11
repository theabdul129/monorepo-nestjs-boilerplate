// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableToUpdateCustomerProfileException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}