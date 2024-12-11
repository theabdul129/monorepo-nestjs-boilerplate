import { Global, Module } from '@nestjs/common';
import { I18nModule, AcceptLanguageResolver, QueryResolver, I18nJsonLoader } from 'nestjs-i18n';
import { join } from 'path';
import { ConfigService } from '@packages/config';
import { I18nHelper } from './i18n.helper';
import { HttpHelper } from './http.helper';
import { PlainValidatorHelper } from './plain-validator.helper';
import { HashingService } from './hashing.service';
import { MomentHelper } from './moment.helper';
import { TokenService } from './token.service';
@Global()
@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.fallback_language,
        loaderOptions: {
          path: join(process.cwd(), 'i18n'),
          watch: configService.environment !== 'production'
        },
        loader: I18nJsonLoader
      }),
      logging: true,
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    })
  ],
  providers: [I18nHelper, HttpHelper, PlainValidatorHelper,HashingService, MomentHelper,TokenService],
  exports: [I18nHelper, HttpHelper, PlainValidatorHelper,HashingService,MomentHelper,TokenService]
})
export class HelperModule {}
