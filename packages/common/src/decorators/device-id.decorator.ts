import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HEADER_CONSTANTS } from '../constants/customer.constant';
import { DeviceIdNotFoundException } from '../exceptions/deviceId-not-found.exception';

export const DeviceId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const deviceId = request.headers[HEADER_CONSTANTS.X_DEVICEID.toLowerCase()];
    if (!deviceId) {
      throw new DeviceIdNotFoundException();
    }
    return deviceId;
  },
);