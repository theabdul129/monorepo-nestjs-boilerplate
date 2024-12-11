import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      'No resource server settings found for the client.',
      HttpStatus.NOT_FOUND,
    );
  }
}
