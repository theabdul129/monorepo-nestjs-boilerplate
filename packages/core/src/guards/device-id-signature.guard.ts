import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SignatureService } from '../signature/signature.service';
import { DeviceIdNotFoundException, HEADER_CONSTANTS, SignatureNotFoundException } from '@packages/common';
import { Request } from 'express';
import { InvalidSignatureException } from '@packages/common';

@Injectable()
export class DeviceIdSignatureGuard implements CanActivate {
  private signatureService = new SignatureService();
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const deviceId = request.headers[HEADER_CONSTANTS.X_DEVICEID.toLowerCase()] as string | undefined;
    
    if (!deviceId) {
      throw new DeviceIdNotFoundException();
    }
    const signature = request.headers[HEADER_CONSTANTS.X_SIGNATURE.toLowerCase()] as string | undefined;
    if (!signature) {
      throw new SignatureNotFoundException();
    }
    const username = request.body['username'];

    const isValidSignature = this.signatureService.verifySignature(deviceId, signature, username);
    if(!isValidSignature) {
        throw new InvalidSignatureException();
    }

    return true;
  }
}
