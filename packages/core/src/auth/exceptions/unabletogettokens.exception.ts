import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@packages/common';

export class UnableToGetTokensException extends ApiException {
  constructor() {
    super('UNABLE_TO_GET_TOKENS', 'Unable to get tokens','Unable to get tokens', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}