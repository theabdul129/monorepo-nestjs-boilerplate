import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import { Cache } from 'cache-manager';
import { CACHE_TTL } from './cache.constant';

@Injectable()
export class CacheService {
  readonly #logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getTenantData<T>(tenantId: number, key: string): Promise<T | undefined> {
    const cacheKey = `tenant:${tenantId}:${key}`;
    return this.get(cacheKey);
  }

  async setTenantData<T>(tenant_id: number, key: string, value: T, ttl: number = CACHE_TTL.ONE_MINUTE): Promise<void> {
    const cacheKey = `tenant:${tenant_id}:${key}`;
    await this.set(cacheKey, value, ttl)
    return;
  }

  async delTenantData(tenant_id: number, key: string): Promise<void> {
    const cacheKey = `tenant:${tenant_id}:${key}`;
    await this.clearCache([cacheKey]);
    return;
  }

  async getUserData<T>(tenant_id: number, user_id: number, key: string): Promise<T | undefined> {
    const cacheKey = `tenant:${tenant_id}:user:${user_id}:${key}`;
    return this.get(cacheKey);
  }

  async setUserData<T>(tenant_id: number, user_id: number, key: string, value: T, ttl: number = CACHE_TTL.ONE_MINUTE): Promise<void> {
    const cacheKey = `tenant:${tenant_id}:user:${user_id}:${key}`;
    await this.set(cacheKey, value, ttl)
    return;
  }

  async delUserData(tenant_id: number, user_id: number, key: string): Promise<void> {
    const cacheKey = `tenant:${tenant_id}:user:${user_id}:${key}`;
    await this.clearCache([cacheKey]);
    return;
  }

  async clearCache(keys: string[]) {
    this.#logger.log(`Start clearing the cache for keys: [${keys}]`);
    try {
        const clearPromises = keys.map(async (key) => {
            const cacheKeys = await this.cacheManager.store.keys(key);
            await Promise.all(cacheKeys.map(async (cacheKey) => {
                try {
                    await this.cacheManager.del(cacheKey);
                    this.#logger.log(`Cache cleared for key: ${cacheKey}`);
                } catch (error) {
                    this.#logger.error(`Failed to clear cache for key: ${cacheKey}`, error);
                }
            }));
        });
        await Promise.all(clearPromises);
    } catch (error) {
        this.#logger.error('Error during cache clearing:', error);
    }
}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  set<T>(key: string, value: T, ttl: number = CACHE_TTL.ONE_MINUTE): Promise<T | undefined> {
    this.cache.set(key, value, ttl);
    return this.cache.get<T>(key);
  }

  get cache(): Cache {
    return this.cacheManager;
  }
  async isRedisConnected(): Promise<boolean> {
    try {
      // Directly access the client from cacheManager if available
      const client = (this.cache.store as any).client;
      const pingResult = await client.ping();
      return pingResult === 'PONG';
    } catch (error) {
      this.#logger.error('Failed to connect to Redis', error);
      return false;
    }
  }

  hash(options: any = {}): string {
    return createHash('md5').update(JSON.stringify(options)).digest('hex');
  }
}
