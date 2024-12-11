import { HttpException, HttpStatus } from '@nestjs/common';

export class ScopeNotFoundException extends HttpException {
  constructor() {
    super('Scope not found', HttpStatus.NOT_FOUND);
  }
}
