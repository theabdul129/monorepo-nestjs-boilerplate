import { HttpStatus } from '@nestjs/common';
import { ApiException } from './api.exception';
export class DeviceIdNotFoundException extends ApiException {
  constructor() {
    super('DEVICEID_NOT_FOUND', 'Device Id not found', `Device Id not found`, HttpStatus.NOT_FOUND);
  }
}
