import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@packages/config';


@Injectable()
export class SignatureService {
  private configService = new ConfigService();
  constructor() {}

  generateSignature(deviceId: string, username: string): string {
    const data = `${deviceId}:${username}`;    
    return crypto.createHmac('sha256', this.configService.signature_secret_key).update(data).digest('hex');
  }

  verifySignature(deviceId: string, signature: string, username: string): boolean {
    const generatedSignature = this.generateSignature(deviceId, username);
    return generatedSignature === signature;
  }
}
