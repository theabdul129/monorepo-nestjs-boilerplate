import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const CurrentChannel = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    return req.channel as any;
  }
);
