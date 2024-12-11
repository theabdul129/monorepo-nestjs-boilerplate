import { Injectable } from '@nestjs/common';
import { I18nContext, TranslateOptions } from 'nestjs-i18n';
import { ConfigService } from '@packages/config';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class HttpHelper {
  #context: any = null;
  constructor(private readonly config: ConfigService) {
  }

  success<T>(data: T, key: string | null = null, options?: TranslateOptions): IResponse<T> {
    const message = key ? this.translate(key, options) : null
    return {
        success: true,
        data: data as T,
        message
    }
  }

  lang(): string {
    return this.#context?.lang as string || this.config.fallback_language;
  }

  translate(key: string, options: TranslateOptions | undefined): string | undefined {
    this.#context = I18nContext.current();
    return this.#context?.translate(`${this.lang()}.${key}`, options)
  }

}
