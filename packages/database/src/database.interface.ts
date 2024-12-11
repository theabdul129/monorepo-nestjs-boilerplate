export interface IDatabaseConfig {
  models: any;
  migrationStorageTableName?: string
}

export interface IDatabaseConnnection {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  port: number | undefined;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | any;
  migrationStorageTableName?: string | undefined;
  dialectOptions?: {
    ssl?: {
      require?: boolean;
      rejectUnauthorized?: boolean;
    }
  },
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  },
  logging: (str: string) => void;
}
