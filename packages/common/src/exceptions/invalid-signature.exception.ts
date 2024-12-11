import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
export class InvalidSignatureException extends ApiException {
  constructor() {
    super('INVALID_SIGNATURE', 'Not a valid Signature', 'Not a valid Signature', HttpStatus.UNAUTHORIZED);
  }
}
