import { Logger } from '@nestjs/common';
import { ConfigService } from '@packages/config';
import { IDatabaseConnnection } from './database.interface';
const config = new ConfigService();
const logger: Logger = new Logger('DATABASE');
export const DATABASE_CONNECTION_CONFIG: IDatabaseConnnection = {
  username: config.database_username,
  password: config.database_password,
  database: config.database_name,
  host: config.database_host,
  port: config.database_port,
  dialect: config.database_dialect,
  migrationStorageTableName: config.database_migration_table_name,
  dialectOptions: config.database_ssl ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  pool: {
    max: config.database_max_pool,
    min: config.database_min_pool,
    acquire: 30000,
    idle: 10000
  },
  logging: (str: string) => {
    logger.debug(str);
  }
};
export default DATABASE_CONNECTION_CONFIG;
