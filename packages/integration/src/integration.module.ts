import { Module, forwardRef, Global } from '@nestjs/common';
import { SystemNotificationModule } from './notification/notification.module';

@Global()
@Module({
  imports: [
    forwardRef(() => SystemNotificationModule),
  ],
  providers: [],
  exports: [],
})
export class IntegrationModule {}
