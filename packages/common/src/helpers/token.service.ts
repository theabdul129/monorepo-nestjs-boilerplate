import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class TokenService {
  /**
   * Decodes a JWT without verifying its signature.
   * @param token The JWT token to decode.
   * @returns Decoded payload or header of the token.
   */
  decodeToken(token: string): any {
    try {
      // Decode the token without verification
      const decoded = jwt.decode(token, { complete: true });
      return decoded; // Returns both the header and payload
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }
}
