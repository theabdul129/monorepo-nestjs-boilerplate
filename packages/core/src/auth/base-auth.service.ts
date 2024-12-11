import { HttpService } from '@packages/common';
import { ConfigService } from '@packages/config';
import { AxiosRequestConfig } from 'axios';
import { FailedToRefreshTokenException } from './exceptions/failedtorefreshtoken.exception';
import axios from 'axios';
import { Logger } from '@nestjs/common';

export abstract class BaseAuthService {
  protected http: HttpService;
  private keycloakUrl: string;
  private adminRealm: string;
  readonly #logger: Logger = new Logger(BaseAuthService.name);

  protected keycloakConfig: any;
  protected keycloakAdminConfig: any;

  constructor(service: string) {
    const config = new ConfigService();
    this.keycloakConfig = config.keycloak_config;
    this.keycloakAdminConfig = config.keycloak_admin_config;
    this.keycloakUrl = config.keycloak_config.authServerUrl;
    this.adminRealm = config.keycloak_admin_config.realm;

    const axiosConfig: AxiosRequestConfig = {
      baseURL: this.keycloakConfig.authServerUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.http = new HttpService(service, axiosConfig);
  }

  protected async getAdminAccessToken(): Promise<string> {
    const url = `${this.keycloakConfig.authServerUrl}/realms/${this.keycloakConfig.realm}/protocol/openid-connect/token`;
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', this.keycloakAdminConfig.clientId);
    data.append('client_secret', this.keycloakAdminConfig.secret);

    // Make the POST request using HttpService
    const response = await this.http.post(url, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  }
  async refreshToken(refresh_token: string) {
    const url = `${this.keycloakUrl}/realms/${this.adminRealm}/protocol/openid-connect/token`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.keycloakConfig.clientId,
      client_secret: this.keycloakConfig.secret,
      refresh_token: refresh_token,
    });
    try {
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error) {
      this.#logger.error(`Failed to refresh Token: ${error}`);
      throw new FailedToRefreshTokenException();
    }
  }
}