import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@packages/common';

export class UnableToSignupException extends ApiException {
  constructor() {
    super('UNABLE_TO_SIGNUP','Unable to signup on Keycloak','Unable to signup on Keycloak',HttpStatus.INTERNAL_SERVER_ERROR);
  }
}