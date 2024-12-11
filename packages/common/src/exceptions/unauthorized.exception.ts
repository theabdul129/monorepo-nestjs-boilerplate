import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
export class UnAuthorizedException extends ApiException {
  constructor() {
    super('UNAUTHORIZED_EXCEPTION', 'The provided token is invalid or has expired.', 'The provided token is invalid or has expired.', HttpStatus.UNAUTHORIZED);
  }
}
