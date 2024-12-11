import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@packages/config';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';
@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        useFactory: async () => ({
          store: await redisStore({
            socket: {
              host: config.cache.host,
              port: config.cache.port
            },
            password: config.cache.pass,
            ttl: config.cache.ttl
          }),
        })
      }),
    })
  ],
  providers: [CacheService],
  exports: [NestCacheModule, CacheService]
})
export class CacheModule {}
