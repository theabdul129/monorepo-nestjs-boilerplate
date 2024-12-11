import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@packages/config';
import { UserNotFoundException } from './exceptions/usernotfound.exception';
import { FailedToRefreshTokenException } from './exceptions/failedtorefreshtoken.exception';
import { FailedToSendResetPasswordEmailException } from './exceptions/failedtosendresetpasswordemail.exception';
import { UnableToLogoutException } from './exceptions/unabletologout.exception.exception';
import { UnableToResetPasswordException } from './exceptions/unabletoresetpassword.exceptions';
import {UnableToUpdateCustomerProfileException } from './exceptions/unabletoupdateprofile.exception';
import { KeyCloakCreateUserDto } from './dtos/keycloak-create-user.dto';
import { UnableToSignupException } from './exceptions/unabletosignup.exception';
import { UserAlreadyExistsException } from './exceptions/useralreadyexists.exception';
import axios from 'axios';


@Injectable()
export class AuthService {
  readonly #logger = new Logger(AuthService.name);

  private keycloakUrl: string;
  private realm: string;
  private clientId: string;
  private clientSecret: string;

  private adminRealm: string;
  private adminClientId: string;
  private adminClientSecret: string;

  constructor() {
    const config = new ConfigService();
    this.keycloakUrl = config.keycloak_config.authServerUrl;
    this.realm = config.keycloak_config.realm;
    this.clientId =  config.keycloak_config.clientId;
    this.clientSecret =  config.keycloak_config.secret;

    this.adminRealm = config.keycloak_admin_config.realm;
    this.adminClientId = config.keycloak_admin_config.clientId;
    this.adminClientSecret = config.keycloak_admin_config.secret;
  }

  async signup(createUserDto: KeyCloakCreateUserDto): Promise<any> {
    this.#logger.log("Keycloak Signup");
    
    const keycloakUser = await this.getUserIdByUsername(createUserDto.username);
    if(keycloakUser) {
      throw new UserAlreadyExistsException();
    }

    try {
      const adminToken = await this.getAdminAccessToken();
      const headers = { Authorization: `Bearer ${adminToken}` };

      const url = `${this.keycloakUrl}/admin/realms/${this.realm}/users`;
      
      const user = {
        username: createUserDto.username,       
        enabled: createUserDto.enabled,        
        credentials: [
          {
            type: 'password',
            value: createUserDto.password,
            temporary: false,
          },
        ],
      };
  
      const resetHeaders = {
        ...headers,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(url, user, { headers: resetHeaders });
      const locationHeader = response.headers['location'];
     
      // Extract the user ID from the Location header
      const userId = locationHeader.split('/').pop();
  
      return userId; 
    } catch (err: any) {
      throw new UnableToSignupException();
    }
  }

  async login(username: string, password: string): Promise<any> {
    this.#logger.log("Keycloak Login");

    try {
        const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
        
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('client_id', this.clientId);
        data.append('client_secret', this.clientSecret);
        data.append('username', username);
        data.append('password', password);
    
        const response = await axios.post(url, data);
        return response.data;
    } catch (err: any) {
      throw new UserNotFoundException();
    }
  }

  async logout(refreshToken: string): Promise<any> {
    
    try {
        const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
        const data = new URLSearchParams();
        data.append('client_id', this.clientId);
        data.append('client_secret', this.clientSecret);
        data.append('refresh_token', refreshToken);
    
        const response = await axios.post(url, data);
        return response.data;
    } catch(err) {
        throw new UnableToLogoutException();
    }  
  }

  async resetPassword(userId: string, newPassword: string): Promise<any> {
    try{
      const url = `${this.keycloakUrl}/admin/realms/${this.realm}/users/${userId}/reset-password`;
      const data = {
        type: 'password',
        value: newPassword,
        temporary: false,
      };

      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${await this.getAdminAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch(error) {
      throw new UnableToResetPasswordException();
    }
  }

  private async getUserIdByUsername(username: string) {
    const url = `${this.keycloakUrl}/admin/realms/${this.realm}/users?username=${username}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${await this.getAdminAccessToken()}`,
      },
    });

    if (response.data.length > 0) {
      return response.data[0].id;
    } else {
      return false;
    }
  }

  private async getAdminAccessToken(): Promise<string> {
    const url = `${this.keycloakUrl}/realms/${this.adminRealm}/protocol/openid-connect/token`;
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', this.adminClientId);
    data.append('client_secret', this.adminClientSecret);

    const response = await axios.post(url, data);
    return response.data.access_token;
  }

  async refreshToken(refreshToken: string) {
    const url = `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });

    try {
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (error) {
      throw new FailedToRefreshTokenException();
    }
  }

  async forgotPassword(userId:string) {  
    try {
      const adminToken = await this.getAdminAccessToken();
      const headers = { Authorization: `Bearer ${adminToken}` };

      const resetUrl = `${this.keycloakUrl}/admin/realms/${this.realm}/users/${userId}/execute-actions-email`;
      const resetHeaders = {
        ...headers,
        'Content-Type': 'application/json',
      };
      const resetBody = ['UPDATE_PASSWORD'];

      await axios.put(resetUrl, resetBody, { headers: resetHeaders });
    } catch (error) {
      throw new FailedToSendResetPasswordEmailException();
    }
  }

  async updateUserProfile(userId: string, profileData: any): Promise<any> {
    try {
      const adminToken = await this.getAdminAccessToken();
      const url = `${this.keycloakUrl}/admin/realms/${this.realm}/users/${userId}`;

      const response = await axios.put(url, profileData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch(error) {
      throw new UnableToUpdateCustomerProfileException();
    }
  }

  async changePassword(userId: string, username: string, oldPassword: string, newPassword: string): Promise<void> {
    try {
      await this.login(username, oldPassword);
    } catch(error) {
      throw new UserNotFoundException();
    }
   
    try {
      await this.resetPassword(userId, newPassword);
    } catch (error) {
      throw new UnableToResetPasswordException();
    }
  }
}
