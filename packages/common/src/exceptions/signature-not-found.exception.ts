import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
export class SignatureNotFoundException extends ApiException {
  constructor() {
    super('SIGNATURE_NOT_FOUND', 'Signature not found', `Signature not found`, HttpStatus.NOT_FOUND);
  }
}
