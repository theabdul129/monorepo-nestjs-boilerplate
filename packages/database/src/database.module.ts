import { Module, Global } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@packages/config';
import { IDatabaseConfig } from './database.interface';
import { DATABASE_CONNECTION_CONFIG } from './database.config';
import { registerSequelizeProvider } from './database.util';

@Global()
@Module({})
export class DatabaseModule {

  private static getConnectionOptions(
    dbConfig: IDatabaseConfig
  ): Sequelize {
    if (!DATABASE_CONNECTION_CONFIG.host || !DATABASE_CONNECTION_CONFIG.username || !DATABASE_CONNECTION_CONFIG.password || !DATABASE_CONNECTION_CONFIG.dialect) {
      throw Error(`Invalid Database Cretendials: `);
    }
    return new Sequelize({
      ...DATABASE_CONNECTION_CONFIG,
      ...dbConfig,
    });
  }

  private static getDatabaseProvider(dbData: IDatabaseConfig): any {
    return [
      {
        provide: 'SEQUELIZE',
        useFactory: () => {
          return this.getConnectionOptions(dbData);
        },
        inject: []
      }
    ]
  }

  public static forRoot(dbConfig: IDatabaseConfig) {
    const databaseProviders = dbConfig?.models?.map((model: any) => registerSequelizeProvider(model, model))
    return {
      module: DatabaseModule,
      imports: [ ConfigModule ],
      controllers: [],
      providers: [...this.getDatabaseProvider(dbConfig), ...databaseProviders],
      exports: [...this.getDatabaseProvider(dbConfig), ...databaseProviders],
    };
  }
}
