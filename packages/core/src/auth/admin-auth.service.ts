import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseAuthService } from './base-auth.service';
import { RoleNotFoundException } from './exceptions/role-not-found.exception';
import { PermissionNotFoundException } from './exceptions/permission-not-found.exception';
import { ScopeNotFoundException } from './exceptions/scope-not-found.exception';
import { ResourceNotFoundException } from './exceptions/resource-not-found.exception';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import PolicyRepresentation, { DecisionStrategy, Logic } from '@keycloak/keycloak-admin-client/lib/defs/policyRepresentation';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { UpdateRoleDTO } from './dtos/update-role.dto';
import { FailedToCreateRoleException } from './exceptions/failedtocreaterole.exception';
import { FailedToUpdateRoleException } from './exceptions/failedtoupdaterole.exception';
import { FailedToDeleteRoleException } from './exceptions/failedtodeleterole.exception';
import { FailedToMapRoleForPolicyException } from './exceptions/failedtomaprolesforpolicy.exception';
import axios from 'axios';
import { UnableToGetTokensException } from './exceptions/unabletogettokens.exception';
import { RoleAlreadyExistsException } from './exceptions/role-already-exists.exception';
import { UnableToLogoutException } from './exceptions/unabletologout.exception.exception';
import { KeyCloakCreateUserDto } from './dtos/keycloak-create-user.dto';
import { UnableToSignupException } from './exceptions/unabletosignup.exception';

@Injectable()
export class AdminAuthService extends BaseAuthService {
  readonly #logger: Logger = new Logger(AdminAuthService.name);
  //private kcAdminClient:any;
  constructor(    
   @Inject('KEYCLOAK_ADMIN_CLIENT') private readonly kcAdminClient: KeycloakAdminClient,
  ) {
    super(AdminAuthService.name);    
  }
  
  async init() {
    try {
      await this.kcAdminClient.auth({
        clientId: this.keycloakAdminConfig.clientId,
        clientSecret: this.keycloakAdminConfig.secret,
        grantType: 'client_credentials',
      });

      this.#logger.log(`Successfully connected to Keycloak`);
    } catch (error) {
      this.#logger.log(`Error connecting to Keycloak ${error}`);
    }
   }

  async getClientRolesList(): Promise<any> {
    await this.init();
      const roles = await this.kcAdminClient.clients.listRoles({
        id: this.keycloakConfig.clientAppId,
      });
      if (roles?.length > 0) {
        this.#logger.log(`Successfully retrieved ${roles.length} roles.`);
        return roles;
      } else {
        this.#logger.warn('No roles found.');
        throw new RoleNotFoundException();
    }    
  }

  async getClientResourcesList(): Promise<any> {
    await this.init();
    const resources = await this.kcAdminClient.clients.listResources({
      id: this.keycloakConfig.clientAppId,
    });
    if (resources?.length > 0) {
      this.#logger.log(`Successfully retrieved ${resources.length} resources.`);
      return resources;
    } else {
      this.#logger.warn('No resource found.');
      throw new ResourceNotFoundException();
    }
  }

  async getScopes(): Promise<any> {
    await this.init();
    const scopes = await this.kcAdminClient.clients.listAllScopes({
      id: this.keycloakConfig.clientAppId,
    });
    if (scopes?.length > 0) {
      this.#logger.log(`Successfully retrieved ${scopes.length} scopes.`);
      return scopes;
    } else {
      this.#logger.warn('No scope found.');
      throw new ScopeNotFoundException();
    }
  }

  async getPermissions(): Promise<any> {
    await this.init();
    const resources = await this.kcAdminClient.clients.listResources({
      id: this.keycloakConfig.clientAppId,
    });
    if (resources?.length > 0) {
      this.#logger.log(`Successfully retrieved ${resources.length} resources.`);
      return resources;
    } else {
      this.#logger.warn('No resource found.');
      throw new PermissionNotFoundException();
    }
  }

  async getResourceServerSettings(): Promise<any> {
    this.#logger.log(`Fetching resource server settings from client}`);
    await this.init();
      const response = await this.kcAdminClient.clients.exportResource({
        id: this.keycloakConfig.clientAppId,
      });

      if (Object.keys(response).length > 0) {
        this.#logger.log('Successfully retrieved resource server settings.');
        const rolePermissionMapping = await this.mapAllRolesToResources(response);
        return rolePermissionMapping;
      } else {
        this.#logger.warn('No resource server settings found.');
        throw new ResourceNotFoundException();
    }
  }

  async createRole(createRoleDTO: CreateRoleDTO): Promise<any> {
    try{
      await this.init();
      this.#logger.log(`Checking if role with name: ${createRoleDTO.name} already exists`);
      const existingRoles = await this.kcAdminClient.clients.listRoles({
        id: this.keycloakConfig.clientAppId,
      });
      const existingRole = existingRoles.find((role) => role.name === createRoleDTO.name);
  
      if (existingRole) {
        this.#logger.warn(`Role with name: ${createRoleDTO.name} already exists`);
        throw new RoleAlreadyExistsException();
      }
      this.#logger.log(`Creating role with name: ${createRoleDTO.name}`);
      const createRoleResponse = await this.kcAdminClient.clients.createRole({
        id: this.keycloakConfig.clientAppId,
        name: createRoleDTO.name,
      });

      this.#logger.log(`Create Role Response: ${createRoleResponse}`);

      this.#logger.log(`Finding role ID for: ${createRoleDTO.name}`);
      const clientRole = await this.kcAdminClient.clients.findRole({
        id: this.keycloakConfig.clientAppId,
        roleName: createRoleDTO.name,
      });


      const clientRoleId = clientRole.id ?? '';
      this.#logger.log(`Role ID found: ${clientRoleId}`);
      const existingPolicies = await this.kcAdminClient.clients.listPolicies({
        id: this.keycloakConfig.clientAppId,
      });
      const policyName = `${createRoleDTO.name}-policy`;
      const existingPolicy = existingPolicies.find((policy) => policy.name === policyName);
      if (existingPolicy) {
        this.#logger.warn(`Policy with name: ${policyName} already exists`);
      }
      const policy = await this.kcAdminClient.clients.createPolicy({
          id: this.keycloakConfig.clientAppId,
          type: 'role',
        },{
          name: policyName,
          logic: Logic.POSITIVE,
          roles: [{ id: clientRoleId}],
        }
      );

      this.#logger.log(`Role-based policy created`);

      for (const permission of createRoleDTO.permissions) {      
        const resourceName = permission.resource_name.toLowerCase().replace(/\s+/g, "");
        const permissionName = `${createRoleDTO.name}-${resourceName}-permission`;
        this.#logger.log(`Creating permission: ${permissionName}`);
        const permissionConfig: PolicyRepresentation = {
          name: permissionName,
          type: 'scope',
          resources: [permission.resource_id],
          scopes: permission.scopes,
          policies: [policy.name || ''],
          decisionStrategy: DecisionStrategy.UNANIMOUS,
        };

        const result = await this.kcAdminClient.clients.createPermission({ 
            id: this.keycloakConfig.clientAppId,  
            type: 'scope', 
          }, 
          permissionConfig
        );
        this.#logger.log(`Role and associated permissions successfully created. ${result}`);
      }
      return true; 
    } catch (err) {
      this.#logger.error(
        `Failed to create role: ${err}`);
        throw new FailedToCreateRoleException();
    }
  }

  async logout(user_id: string): Promise<void> {
    try {
      await this.init();
  
      if (!user_id) {
        this.#logger.warn('User ID is required for logout.');
        throw new Error('User ID is missing.');
      }
  
      await this.kcAdminClient.users.logout({ id: user_id });
      this.#logger.log(`Successfully logged out user with ID: ${user_id}`);
    } catch (error) {
      this.#logger.error(`Failed to logout user: ${error}`);
      throw new UnableToLogoutException();
    }
  }

  async updateRole(updateRoleDTO: UpdateRoleDTO): Promise<any> {
     try {
      await this.init();
      const updatedRoleObj: { [key: string]: any } = {};
      updatedRoleObj.name = !!updateRoleDTO.new_name ? updateRoleDTO.new_name: updateRoleDTO.current_name;
      if (!!updateRoleDTO.description) updatedRoleObj.description = updateRoleDTO.description;

      this.#logger.log(`Updating role: ${updateRoleDTO.current_name}`);
      this.#logger.debug(`Updated role object: ${JSON.stringify(updatedRoleObj)}`);

      await this.kcAdminClient.clients.updateRole({
        id: this.keycloakConfig.clientAppId,
        roleName: updateRoleDTO.current_name,
      }, updatedRoleObj);

        const clientRole = await this.kcAdminClient.clients.findRole({
        id: this.keycloakConfig.clientAppId,
        roleName: updatedRoleObj.name,
      });

      const clientRoleId = clientRole.id ?? '';
      this.#logger.log(`Role ID found: ${clientRoleId}`);
      const existingPolicies = await this.kcAdminClient.clients.listPolicies({
        id: this.keycloakConfig.clientAppId,
      });
      const policyName = `${updateRoleDTO.current_name}-policy`;
      const existingPolicy = existingPolicies.find(
        (policy) => policy.name === policyName,
      );

      for (const permission of updateRoleDTO.permissions) {
        const resourceName = permission.resource_name
          .toLowerCase()
          .replace(/\s+/g, '');
        const permissionName = `${updateRoleDTO.current_name}-${resourceName}-permission`;
        this.#logger.log(`Creating permission: ${permissionName}`);
        console.log("🚀 ~ updateRole ~ permissionName:", permissionName)
        const permissionConfig: PolicyRepresentation = {
                name: permissionName,
                type: 'scope',
                resources: [permission.resource_id],
                scopes: permission.scopes, 
                policies: [existingPolicy?.name || ''],
                decisionStrategy: DecisionStrategy.UNANIMOUS,
          };
        const permissionByName =
          await this.kcAdminClient.clients.findPermissions({
            id: this.keycloakConfig.clientAppId,
            name: permissionName,
          });
        if (permissionByName.length == 0) {
          this.#logger.warn(
            `Permission not found: ${permission.resource_name}. Creating new permission.`,
          );
    
            await this.kcAdminClient.clients.createPermission(
                { id: this.keycloakConfig.clientAppId, type: 'scope' },
                permissionConfig,
            );
    
            this.#logger.log(`Created new permission: ${permission.resource_name}`);
        } else {
            this.#logger.log(`Permission found: ${permission.resource_name}`);
            const permissionId = permissionByName[0].id || "";

        await this.kcAdminClient.clients.updatePermission(
          { id:  this.keycloakConfig.clientAppId,  type: 'scope', permissionId: permissionId },
          permissionConfig
        );      
        this.#logger.log(
          `Successfully updated permission: ${permission.resource_name}`,
        );        
      }
    }
    this.#logger.log(`All permissions processed successfully.`);
      this.#logger.log(`Role '${updateRoleDTO.current_name}' updated successfully.`);
    } catch(err) {
      this.#logger.error(
        `Failed to update role: ${updateRoleDTO.current_name}. Error: ${err}`
      );
      throw new FailedToUpdateRoleException();
    }    
  }

  async deleteRoleAndAssociatedData(roleName: any): Promise<any> {
    try {
      await this.init();
      const role = await this.kcAdminClient.clients.findRole({
        id: this.keycloakConfig.clientAppId,
        roleName,
      });
  
      if (!role) {
        this.#logger.warn(`Role ${roleName} not found.`);
        throw new RoleNotFoundException();
      }
      const roleId = role.id;
  
      const policies = await this.kcAdminClient.clients.listPolicies({
        id: this.keycloakConfig.clientAppId,
      });
  
      if (policies && policies.length > 0) {
        const rolePolicies = policies.filter((policy) =>
          policy.config?.roles?.includes(roleId)
        );
  
        if (rolePolicies.length > 0) {
          await Promise.all(
            rolePolicies.map((policy) =>
              this.kcAdminClient.clients.delPolicy({
                id: this.keycloakConfig.clientAppId,
                policyId: policy.id || "",
              }).then(() => this.#logger.log(`Deleted policy: ${policy.name}`))
            )
          );
        } else {
          this.#logger.log(`No associated policies found for role ${roleName}.`);
        }
      } else {
        this.#logger.warn(`No policies found for client app ID.`);
      }
      await this.kcAdminClient.clients.delRole({
        id: this.keycloakConfig.clientAppId,
        roleName,
      });
      this.#logger.log(`Deleted role: ${roleName}`);
  
    } catch (error) {
      this.#logger.error(
        `Failed to delete role and associated data: ${error}`,
        error
      );
      throw new FailedToDeleteRoleException();
    }
  }

  async loginUrl(redirect_uri: string,state?:string): Promise<any> {
    this.#logger.log("Keycloak Login");

      const url = `${this.keycloakConfig.authServerUrl}/realms/${this.keycloakConfig.realm}/protocol/openid-connect/auth`;

      const data = new URLSearchParams();
      data.append('response_type', 'code');
      data.append('client_id', this.keycloakConfig.clientId);
      data.append('scope', this.keycloakConfig.scopes);
      data.append('redirect_uri', redirect_uri || this.keycloakConfig.redirectUri);
      if(!!state) {
        data.append('state',state || '');
      }      
      const finalUrl = `${url}?${data.toString()}`;
      return finalUrl;    
  }

  async getTokensByCode(code: string, redirect_uri: string): Promise<any> {
    this.#logger.log("Calling GetTokensByCode");

    try {
        const url = `${this.keycloakConfig.authServerUrl}/realms/${this.keycloakConfig.realm}/protocol/openid-connect/token`;
        
        const data = new URLSearchParams();
        data.append('grant_type', 'authorization_code');
        data.append('code', code || '');
        data.append('redirect_uri', redirect_uri || this.keycloakConfig.redirectUri);
        data.append('client_id', this.keycloakConfig.clientId);
        data.append('client_secret', this.keycloakConfig.secret);
    
        const response = await axios.post(url, data);
        return response.data;
    } catch (error: any) {
      console.log(error,'error');
      this.#logger.error(
        `Unable to fetch the tokens by code: ${error}`,
        error
      );
      throw new UnableToGetTokensException();
    }
  }

  async createUser(createUserDto: KeyCloakCreateUserDto ): Promise<any> {
    await this.init();
    try {
      const userInfo = {
        username: createUserDto.username,       
        enabled: createUserDto.enabled,
        email: createUserDto.email,        
        credentials: [
          {
            type: 'password',
            value: createUserDto.password,
            temporary: false,
          },
        ],
      };
      const user = await this.kcAdminClient.users.create(userInfo);
      return user.id;
    } catch(error) {
      this.#logger.error(
        `Failed to create user: ${error}`,
        error
      );
      throw new UnableToSignupException();
    }    
  }

  private async mapAllRolesToResources(permissionJSON: any) {
    const roleMappings: any = {};
  
    permissionJSON.policies.forEach((policy: { config: { roles: string; }; name: any; }) => {
      try {
        const roles = policy.config.roles ? JSON.parse(policy.config.roles) : [];
  
        roles.forEach((roleConfig: { id: any; }) => {
          const roleId = roleConfig.id.split('/').pop();
  
          if (!roleMappings[roleId]) {
            roleMappings[roleId] = {};
          }
  
          const permissionsForRole = permissionJSON.policies.filter((permission: { config: { applyPolicies: any; }; }) =>
            JSON.parse(permission.config.applyPolicies || '[]').includes(policy.name)
          );
  
          const result = permissionsForRole.map((permission:any) => ({
            name: permission.name,
            description: permission.description,
            resources: permission.config.resources,
            scopes: permission.config.scopes || [],            
          }));
          
          const resourcesForRole = permissionsForRole.flatMap((permission: { config: { resources: any; }; }) =>
            JSON.parse(permission.config.resources || '[]')
          );
  
          const resources: any = [];
          resourcesForRole.forEach((resourceName: any) => {
            const resource = permissionJSON.resources.find((res: { name: any; }) => res.name === resourceName);
            if (resource) resources.push(resource);
          });
          roleMappings[roleId] = {
            resources: resources,
            permissions: result
          };
        });
      } catch (error) {
        this.#logger.error(`Error mapping roles for policy: ${policy.name}`, error);
        throw new FailedToMapRoleForPolicyException();
      }
    }); 
    this.#logger.log('Role mappings successfully created'); 
    return roleMappings;
  }
}
