import { Module, forwardRef } from '@nestjs/common';
import { CoreModule } from '@packages/core';
import { ConfigModule } from '@packages/config';
import { CommonModule } from '@packages/common';
import { DatabaseModule, UserEntity } from '@packages/database';
import { UserModule } from '@modules/users/users.module';

@Module({
  imports: [
    CommonModule,
    CoreModule,
    ConfigModule,
    DatabaseModule.forRoot({
      models: [UserEntity],
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
