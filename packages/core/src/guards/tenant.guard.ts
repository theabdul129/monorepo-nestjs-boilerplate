import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { HEADER, IS_PUBLIC_ENDPOINT } from '@packages/common';
import { ConfigService } from '@packages/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalTenantGuard implements CanActivate {
  #logger = new Logger(GlobalTenantGuard.name);
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const tenantId = request.headers[HEADER.TENANT] as number | undefined;
    const headers = {
      [HEADER.TENANT]: tenantId,
    };
    if (!tenantId) {
      throw new UnauthorizedException(
        'Tenant ID is missing in the request header.',
      );
    }

    try {
      // const CACHE_KEY = `tenants:${tenantId}:360`;
      // const cacheTenant = await this.cache.get(CACHE_KEY);
      // if(cacheTenant){
      //   this.#logger.log(`Found tenant [${tenantId}] from cache`);
      //   request.tenant = cacheTenant;
      //   return true;
      // }
      const url = `${this.config.master_data_service_url}/api/v1/master-service/tenants/${tenantId}`;
      const response: any = await axios.get(url, {
        headers: headers,
      });
      if (response?.data?.success) {
        request.tenant = response.data.data;
      }
      return true;
    } catch (error) {
      this.#logger.error(error);
      throw new UnauthorizedException('Failed to retrieve tenant data.');
    }

    return true;
  }
}
