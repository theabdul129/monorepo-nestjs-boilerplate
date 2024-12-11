import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  private developerMessage: string;
  private isApiException: boolean;
  constructor(name: string, message: string, developerMessage: string, statusCode: HttpStatus) {
    super({ message }, statusCode);
    this.name = name;
    this.developerMessage = developerMessage;
    this.isApiException = true;
  }
}
