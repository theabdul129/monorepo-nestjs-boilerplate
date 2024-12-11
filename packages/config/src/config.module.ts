import { Module, Global } from '@nestjs/common';
import { ConfigService } from "./config.service";
import * as dotenv from 'dotenv';
dotenv.config();

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
