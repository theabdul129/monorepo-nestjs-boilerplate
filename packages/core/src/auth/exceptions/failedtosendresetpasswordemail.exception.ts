// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToSendResetPasswordEmailException extends HttpException {
    constructor() {
        super('Failed to send reset password email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}