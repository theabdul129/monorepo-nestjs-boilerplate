import { Injectable } from '@nestjs/common';
import { Transport, RmqOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { QUEUE } from './contants/contants';
dotenv.config();

@Injectable()
export class ConfigService {

  #env: NodeJS.ProcessEnv = process.env;

  get env(): NodeJS.ProcessEnv {
    return this.#env
  }

  get port(): number {
    const port = this.get<string>('ENV_PORT') || this.get<string>('PORT')  ;
    return parseInt(port as string, 10) || 3000
  }

  get database_ssl(): boolean {
    return this.get<string>('ENV_DATABASE_SSL') === 'false' ? false : true;
  }

  get database_dialect(): string | undefined {
    return this.get<string>('ENV_DATABASE_DIALECT') || 'postgres';
  }

  get database_host(): string | undefined {
    return this.get<string>('ENV_DATABASE_HOST');
  }

  get database_username(): string | undefined {
    return this.get<string>('ENV_DATABASE_USERNAME');
  }

  get database_name(): string | undefined {
    return this.get<string>('ENV_DATABASE_NAME');
  }


  get database_migration_table_name(): string | undefined {
    return this.get<string>('ENV_DATABASE_MIGRATION_TABLE_NAME') || 'SME_MIGRATIONS_TABLE';
  }

  get database_password(): string | undefined {
    return this.get<string>('ENV_DATABASE_PASSWORD');
  }

  get database_port(): number | undefined {
    return parseInt(this.get<string>('ENV_DATABASE_PORT') as string, 10) || 5432;
  }

  get database_min_pool(): number {
    return parseInt(this.get<string>('ENV_DATABASE_MIN_POOL') as string, 10) || 5;
  }

  get database_max_pool(): number {
    return parseInt(this.get<string>('ENV_DATABASE_MAX_POOL') as string, 10) || 20;
  }

  get environment(): string {
    return this.get<string>('NODE_ENV') || 'development';
  }

  get prefix(): string {
    return this.get<string>('ENV_PREFIX') || 'api/v1';
  }

  get application_name(): string | undefined {
    return this.get<string>('npm_package_name');
  }

  get application_version(): string | undefined {
    return this.get<string>('npm_package_version');
  }

  get log_level(): string {
    return this.get<string>('LOG_LEVEL') || 'info';
  }

  get trans_node(): string {
    return this.get<string>('NODE_NAME') || 'unknown-node';
  }

  get fallback_language(): string {
    return this.get<string>('ENV_FALLBACK_LANGUAGE') || 'en';
  }

  get enable_audit_logging() : boolean {
    return this.get<boolean>('ENV_ENABLE_AUDIT_LOGGING') || true;
  }

  get signature_secret_key() : string {
    return this.get<string>('ENV_SIGNATURE_SECRET_KEY') || '';
  }

  get customer_service_url() : string {
    return this.get<string>('ENV_CUSTOMER_SERVICE_URL') || '';
  }

  get admin_service_url() : string {
    return this.get<string>('ENV_ADMIN_SERVICE_URL') || '';
  }

  get master_data_service_url() : string {
    return this.get<string>('ENV_MASTER_DATA_SERVICE_URL') || '';
  }

  get default_language() : string {
    return this.get<string>('ENV_DEFAULT_LANGUAGE') || '';
  }

  get ui_engine_service_hostname(): string {
    return this.get<string>('ENV_UI_ENGINE_SERVICE_HOSTNAME') || '';
  }

  get camunda(): {process_instance_name: string, oauth_url: string, operate_base_url: string, tasklist_base_url: string, zeebee_address: string, zeebee_client_id: string, zeebee_client_secret: string} {
    return {
      process_instance_name: this.get<string>('ENV_CAMUNDA_PROCESS_INSTANCE_NAME') || '',
      oauth_url: this.get<string>('ENV_CAMUNDA_OAUTH_URL') || '',
      operate_base_url: this.get<string>('ENV_CAMUNDA_OPERATE_BASE_URL') || '',
      tasklist_base_url: this.get<string>('ENV_CAMUNDA_TASKLIST_BASE_URL') || '',
      zeebee_address: this.get<string>('ENV_ZEEBE_ADDRESS') || '',
      zeebee_client_id: this.get<string>('ENV_ZEEBE_CLIENT_ID') || '',
      zeebee_client_secret: this.get<string>('ENV_ZEEBE_CLIENT_SECRET') || '',

    }
  }

  get cache(): { host: string | undefined, port: number | undefined, pass: string | undefined, ttl: number | undefined} {
    return {
      host: this.get<string>('ENV_CACHE_HOST'),
      port: this.get<number>('ENV_CACHE_PORT'),
      pass: this.get<string>('ENV_CACHE_PASSWORD'),
      ttl: this.get<number>('ENV_CACHE_DEFAULT_TTL') || 3600
    };
  }

  get logger(): { max_file_size: string, max_files: string, date_pattern: string} {
    return {
      max_file_size: this.get<string>('ENV_LOGGER_MAX_FILE_SIZE') || '20m',
      max_files: this.get<string>('ENV_LOGGER_MAX_FILES') || '6h',
      date_pattern: this.get<string>('ENV_LOGGER_DATE_PATTERN') || 'YYYY-MM-DD',
    }
  }

  getAuditQueueOptions(): RmqOptions {
    const queueUrl = this.get<string>('ENV_AUDIT_SERVICE_AMQP_URL') as string || this.get<string>('ENV_AMQP_URL') as string;
    return this.queue_connection(QUEUE.AUDIT, queueUrl)
  }

  getNotificationQueueOptions(): RmqOptions {
    const queueUrl = this.get<string>('ENV_NOTIFICATION_SERVICE_AMQP_URL') as string;
    return this.queue_connection(QUEUE.NOTIFICATION,queueUrl);
  }

  queue_connection(queue_name: string, connection_url: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [connection_url as string],
        queue: queue_name,
        queueOptions: {
          durable: false,
          arguments: {
            'x-dead-letter-exchange': 'dlx_exchange',
            'x-dead-letter-routing-key': 'dlx_queue'
          },
        },
      }
    }
  }

  get OTPSettings() {
    return {
      enable_mock_otp: this.get<string>('ENV_OTP_MOCK') == 'true' || false,
      mock_otp_key: this.get<string>('ENV_OTP_MOCK_KEY') || '',
      num_of_retries: this.get<number>('ENV_OTP_RETRIES'),
      expiry_period: this.get<number>('ENV_OTP_EXPIRY_PERIOD'),
      lock_period: this.get<number>('ENV_OTP_LOCK_PERIOD'),
      enable_hash: this.get<string>('ENV_OTP_ENABLE_HASH') == 'true'
    };
  }

  get riyadh_bank_config() {
    return {
      mock: this.get<string>('ENV_RB_SYSTEM_MOCK'),
      base: this.get<string>('ENV_RB_SYSTEM'),
      client_id:this.get<string>('ENV_RB_SYSTEM_CLIENT_ID'),
      client_secret:this.get<string>('ENV_RB_SYSTEM_CLIENT_SECRET'),
    };
  }

  getMailOptions() {
    const host = this.get<string>('ENV_MAIL_HOST_URL') as string;
    const username = this.get<string>('ENV_MAIL_HOST_USERNAME') as string;
    const password = this.get<string>('ENV_MAIL_HOST_PASSWORD') as string;

    return {
      transport: {
        host: host,
        port: 587,
        secure: false,
        auth: {
          user: username,
          pass: password
        },
        tls: {
          rejectUnauthorized: false
        },
      },
    };
  }

  get mail_from(): string {
    return this.get<string>('ENV_MAIL_FROM') || 'en';
  }

  get invite_url(): string {
    return this.get<string>('ENV_INVITE_URL') || '';
  }

  public get<T>(key: string): T {
    return this.env[key] as T;
  }

  get keycloak_config() : {authServerUrl: string, realm: string,clientId: string,clientAppId: string,secret: string,scopes:string,redirectUri:string} {
    return {
      authServerUrl: this.get<string>('ENV_KEYCLOAK_HOST'), 
      realm: this.get<string>('ENV_KEYCLOAK_REALM'),
      clientId: this.get<string>('ENV_KEYCLOAK_CLIENT_ID'),
      clientAppId: this.get<string>('ENV_KEYCLOAK_CLIENT_APP_ID'),
      secret: this.get<string>('ENV_KEYCLOAK_CLIENT_SECRET'),   
      scopes: this.get<string>('ENV_KEYCLOAK_CLIENT_SCOPES'),
      redirectUri: this.get<string>('ENV_KEYCLOAK_CLIENT_APP_REDIRECT_URI')
    };
  }

  get keycloak_admin_config() : {authServerUrl: string, realm: string,clientId: string,secret: string} {
    return {
      authServerUrl: this.get<string>('ENV_KEYCLOAK_HOST'), 
      realm: this.get<string>('ENV_KEYCLOAK_ADMIN_REALM'),
      clientId: this.get<string>('ENV_KEYCLOAK_ADMIN_CLIENT_ID'),
      secret: this.get<string>('ENV_KEYCLOAK_ADMIN_CLIENT_SECRET'),
    };
  }
}
