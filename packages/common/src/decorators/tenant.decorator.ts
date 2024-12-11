import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const CurrentTenant = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    return req.tenant as any;
  }
);
