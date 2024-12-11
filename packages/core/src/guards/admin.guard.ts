import { KEYCLOAK_CONNECT_OPTIONS, KEYCLOAK_INSTANCE, KEYCLOAK_LOGGER, KEYCLOAK_MULTITENANT_SERVICE, AuthGuard as KeycloakAuthGuard, KeycloakMultiTenantService } from 'nest-keycloak-connect';
import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { HEADER, UnAuthorizedException } from '@packages/common';
import { ConfigService } from '@packages/config';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
@Injectable()
export class AdminGuard extends KeycloakAuthGuard implements CanActivate {
  #logger = new Logger(AdminGuard.name);
  
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    protected _keycloak: any,
    @Inject(KEYCLOAK_CONNECT_OPTIONS)
    protected _keycloakOpts: any,
    @Inject(KEYCLOAK_LOGGER)
    protected _logger: Logger,
    @Inject(KEYCLOAK_MULTITENANT_SERVICE)
    protected _tenant: KeycloakMultiTenantService,
    protected readonly _reflector: Reflector
  ) {
    super(_keycloak,_keycloakOpts,_logger,_tenant,_reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = new ConfigService();
    const request = context.switchToHttp().getRequest();
    let isAuthorized = await super.canActivate(context) as boolean;
    if(!isAuthorized) {
      this.#logger.debug(`Invalid Access Token.`)
      throw new UnAuthorizedException();
    }

    this.#logger.debug(`Access Token successfully authenticated for user.${request.user.sub}`)
    if (isAuthorized) {
      const tenant = request.headers[HEADER.TENANT] as number | undefined;
      const headers = {
        [HEADER.TENANT]: tenant
      };

      const url = `${config.admin_service_url}/api/v1/admin-service/admin/users/auth-user/${request.user.sub}`;
      const response: any = await axios.get(url, {       
        headers: headers
      });
      if(response?.data?.success) {
        request.user = response.data.data;
        return isAuthorized;
      }      
      return false;
    }

    return isAuthorized;
  }
}