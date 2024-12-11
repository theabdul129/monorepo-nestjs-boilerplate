// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToMapRoleForPolicyException extends HttpException {
  constructor() {
    super('Failed to map roles for policy', HttpStatus.BAD_REQUEST);
  }
}
