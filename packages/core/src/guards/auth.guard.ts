import { AuthGuard as KeycloakAuthGuard } from 'nest-keycloak-connect';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { HEADER, UnAuthorizedException } from '@packages/common';
import { ConfigService } from '@packages/config';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {
  #logger = new Logger(AuthGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = new ConfigService();
    const request = context.switchToHttp().getRequest();
    const isAuthorized = await super.canActivate(context) as boolean;
    if(!isAuthorized) {
      this.#logger.debug(`Invalid Access Token.`)
      throw new UnAuthorizedException();
    }

    this.#logger.debug(`Access Token successfully authenticated.`)
    if (isAuthorized) {
      const tenant = request.headers[HEADER.TENANT] as number | undefined;
      const headers = {
        [HEADER.TENANT]: tenant
      };

      const url = `${config.customer_service_url}/api/v1/customer-service/customers`;
      const response: any = await axios.get(url, {
        params: {
          auth_user_id: request.user.sub
        },
        headers: headers
      });
      if(response?.data?.success) {
        request.user = response.data.data;
      }      
    }

    return isAuthorized;
  }
}