import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    KeycloakConnectModule,
} from 'nest-keycloak-connect';
import { ConfigModule as KeycloakConfigModule } from './config/config.module';
import { KeycloakConfigService } from './config/keycloak-config.service';
import { ConfigModule, ConfigService } from '@packages/config';
import { AdminAuthService } from './admin-auth.service';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

@Global()
@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakConfigModule]
    })
  ],
  providers: [AuthService, AdminAuthService,
    {
      provide: 'KEYCLOAK_ADMIN_CLIENT',
      useFactory: async () => {        
        const config = new ConfigService();
        const keycloakAdmin = new KeycloakAdminClient({
          baseUrl: config.keycloak_admin_config.authServerUrl,
          realmName: config.keycloak_admin_config.realm
        });
        return keycloakAdmin;
      }
    }
  ],
  exports: [KeycloakConnectModule,AuthService,AdminAuthService]
})
export class AuthModule {}
