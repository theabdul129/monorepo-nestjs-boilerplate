// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToCreateRoleException extends HttpException {
  constructor() {
    super('An unexpected error occurred during role creation', HttpStatus.BAD_REQUEST);
  }
}
