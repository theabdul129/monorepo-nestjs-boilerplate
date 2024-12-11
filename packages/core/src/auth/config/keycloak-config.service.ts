import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory } from 'nest-keycloak-connect';
import { ConfigService } from '@packages/config';
const config = new ConfigService();

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return config.keycloak_config
  }
}
