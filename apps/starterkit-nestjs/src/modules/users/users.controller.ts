import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { IResponse, Audit, HttpHelper } from '@packages/common';
import { UserEntity } from '@packages/database';
import { AuthGuard } from '@packages/core';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly http: HttpHelper,
  ) {}

  @Audit({
    code: 'CREATE_NEW_USER',
    description: 'Creating a new user in the system.',
  })
  @Post('/')
  async create(@Body() input: CreateUserDto): Promise<IResponse<UserEntity>> {
    const user = await this.userService.create(input);
    return this.http.success(user, 'USER_CREATED');
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Audit({
    code: 'FETCH_ALL_USERS',
    description: 'Returns a list of all users.',
    mask: {
      request: false,
      response: false,
    },
  })
  async list(): Promise<IResponse<UserEntity[]>> {
    const users = await this.userService.findAll();
    return this.http.success(users, 'USER_LIST_RETERIVE');
  }

  @Get('/:id')
  @Audit({
    code: 'FETCH_USER',
    description: 'Find a user by id.',
    mask: {
      request: false,
      response: false,
    },
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<UserEntity>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return this.http.success(user, 'USER_RETERIVE');
  }

  @Patch('/:id')
  @Audit({
    code: 'UPDATE_USER',
    description: 'Updating a user.',
    // mask: {
    //   request: false,
    //   response: false
    // }
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateUserDto,
  ): Promise<IResponse<UserEntity>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    const updatedUser = await this.userService.update(id, input);
    return this.http.success(updatedUser, 'USER_UPDATED');
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Audit({
    code: 'DELETE_USER',
    description: 'Deleting a user.',
    mask: {
      request: ['contact_no'],
      response: ['contact_no'],
    },
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<void>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    await this.userService.delete(id);
    return this.http.success(null, 'USER_DELETED');
  }
}
