import { Module, Global } from '@nestjs/common';
import { SystemNotificationService } from './notification.service';
import { ConfigModule } from '@packages/config';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [SystemNotificationService],
  exports: [SystemNotificationService]
})
export class SystemNotificationModule {}
