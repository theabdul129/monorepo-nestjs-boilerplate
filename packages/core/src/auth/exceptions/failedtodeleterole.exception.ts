// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToDeleteRoleException extends HttpException {
  constructor() {
    super('An unexpected error occurred during role delete.', HttpStatus.BAD_REQUEST);
  }
}
