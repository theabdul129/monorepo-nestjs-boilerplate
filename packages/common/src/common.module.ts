import { Module, Global } from '@nestjs/common';
import { HelperModule } from './helpers/helper.module';
import { UtilsService } from './utils/utils.service'
@Global()
@Module({
  imports: [ HelperModule ],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class CommonModule {}
