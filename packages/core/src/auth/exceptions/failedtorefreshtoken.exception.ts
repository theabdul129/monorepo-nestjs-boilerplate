// src/exceptions/user-not-found.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedToRefreshTokenException extends HttpException {
    constructor() {
        super('Failed to refresh token', HttpStatus.UNAUTHORIZED);
    }
}