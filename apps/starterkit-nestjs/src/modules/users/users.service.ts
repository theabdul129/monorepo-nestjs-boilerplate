import { Inject, Injectable, Logger } from '@nestjs/common';
import { TABLE, UserEntity } from '@packages/database';
import { CacheService } from '@packages/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const CACHE_KEY = TABLE.USER;
@Injectable()
export class UserService {
  readonly #logger: Logger = new Logger(UserService.name);

  constructor(
    @Inject(UserEntity) private readonly userRepo: typeof UserEntity,
    private readonly cache: CacheService,
  ) {}

  clearCache(user_id?: number): void {
    this.cache.clearCache([
      user_id ? `${CACHE_KEY}:${user_id}` : `${CACHE_KEY}:*`,
    ]);
  }

  async create(input: CreateUserDto): Promise<UserEntity> {
    try {
      this.#logger.log(`Start creating a new user [email=${input.email}].`, {
        input: input,
      });
      const user = await this.userRepo.create<UserEntity>(input);
      this.#logger.log(
        `New user created: [email=${input.email},user_id:${user.id}]`,
        { data: user },
      );
      await this.clearCache();
      return user;
    } catch (error) {
      this.#logger.error(
        `Failed to create new user. Error message: ${error.message}`,
        error,
        { input: input },
      );
      throw error;
    }
  }

  // async pagination(
  //   pageOptions: FilterUserDto,
  //   tenant_id: string,
  //   user_id: string
  // ): Promise<PageDto<User>> {
  //   this.#logger.log(`Start finding a paginated list of users`);
  //   const {
  //     first_name,
  //     last_name,
  //     role_id
  //   } = pageOptions;
  //   const condition: any = {
  //     tenant_id: tenant_id,
  //     id: {
  //       [Op.ne]: user_id
  //     }
  //   };
  //   if (first_name) {
  //     condition['first_name'] = where(
  //       fn('LOWER', col('first_name')),
  //       'LIKE',
  //       '%' + first_name?.toLowerCase() + '%'
  //     );
  //   }

  //   if (last_name) {
  //     condition['last_name'] = where(
  //       fn('LOWER', col('last_name')),
  //       'LIKE',
  //       '%' + last_name?.toLowerCase() + '%'
  //     );
  //   }

  //   if(pageOptions?.status?.toUpperCase() == STATUS.BLOCKED){
  //     condition['is_locked'] = true;
  //   }
  //   else if (pageOptions?.status?.toUpperCase() == STATUS.ARCHIVED){
  //     condition['status'] = pageOptions?.status;
  //   }
  //   else if (pageOptions?.status) {
  //     this.requestPoolHelper.applyStatusFilters(pageOptions.status, condition);
  //   }else{
  //     condition['status'] = {
  //       [Op.ne]: STATUS.ARCHIVED
  //     };
  //   }

  //   if (role_id) {
  //     const query =  literal(`
  //       (SELECT DISTINCT ur.user_id FROM "${TABLE.USER_ROLE}" as ur WHERE ur.role_id = '${role_id}' and ur.user_id != '${user_id}')
  //     `);
  //     condition['id'] = {
  //       [Op.in]: query
  //     }
  //   }

  //   const params = {
  //     pagination: pageOptions.pagination,
  //     page: pageOptions.page,
  //     pageSize: pageOptions.pageSize,
  //     attributes: User.attributes(),
  //     order: [
  //       [pageOptions.order_key || UPDATED_ON, pageOptions.order]
  //     ] as any,
  //     where: condition,
  //     scopes: [
  //       'withRequestPool'
  //     ]
  //   } as any;
  //   const users = await this.userRepo.paginate(params);
  //   this.#logger.log(`Total number of users [${users.data.length}]`);
  //   return users;
  // }

  async findAll(): Promise<UserEntity[]> {
    this.#logger.log(`Start listing users.`);
    const cacheUsers = await this.cache.get<UserEntity[]>(`${CACHE_KEY}`);
    if (cacheUsers) {
      this.#logger.log(`Total cache user found: [${cacheUsers?.length}]`);
      return cacheUsers;
    }
    const users = await this.userRepo.findAll<UserEntity>();
    if (users) {
      this.#logger.log(`Total users found: [${users?.length}]`);
      await this.cache.set(`${CACHE_KEY}`, users);
      return users;
    }
    return users;
  }

  async findOne(user_id: number): Promise<UserEntity> {
    this.#logger.log(`Start finding: [user_id=${user_id}]`);
    const cacheUser = await this.cache.get<UserEntity>(
      `${CACHE_KEY}:${user_id}`,
    );
    if (cacheUser) {
      this.#logger.log(`User cache found: [user_id=${user_id}]`);
      return cacheUser;
    }
    const user = await this.userRepo.findOne<UserEntity>({
      where: { id: user_id },
      attributes: UserEntity.attributes(),
    });
    if (user) {
      this.#logger.log(`User found: [user_id=${user_id}]`);
      await this.cache.set(`${CACHE_KEY}:${user_id}`, user?.toJSON());
      return user;
    }
    this.#logger.warn(`User not found: [user_id=${user_id}]`);
    return user;
  }

  async update(user_id: number, input: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepo.update<UserEntity>(input, {
        where: {
          id: user_id,
        },
        returning: true,
      });
      await this.clearCache();
      return user?.[1]?.[0];
    } catch (error) {
      this.#logger.error(
        `Failed to update user. Error message: ${error.message}`,
        error,
        { user_id: user_id, input: input },
      );
      throw error;
    }
  }

  async delete(user_id: number): Promise<boolean> {
    try {
      this.#logger.log(`Deleting user: [user_id=${user_id}]`);
      await this.userRepo.update(
        {
          deleted_on: new Date(),
        },
        {
          where: { id: user_id },
          hooks: true,
          individualHooks: true,
        },
      );
      this.#logger.log(`User Deleted: [user_id=${user_id}]`);
      await this.clearCache();
      return true;
    } catch (error) {
      this.#logger.error(
        `Failed to delete user. Error message: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
