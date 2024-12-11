import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';

@Injectable()
export class WorkflowGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    context.switchToHttp().getRequest();
    // const request: Request = context.switchToHttp().getRequest();
    return true;
  }
}
