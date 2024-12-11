import { Injectable } from '@nestjs/common';
import { I18nContext, TranslateOptions } from 'nestjs-i18n';
import { ConfigService } from '@packages/config';

@Injectable()
export class I18nHelper {
  #context: any = null;
  constructor(private readonly config: ConfigService) {
    this.#context = I18nContext.current();
  }
  /**
   * Translate a key
   * @param {string} key - The key to translate
   * @param {object} args - The arguments to pass to the translation
   * @param {string} lang - The language to translate to
   * @returns {string} The translated string
   */
  t(key: string, options?: TranslateOptions): string | undefined {
    return this.#context?.t(`${this.lang()}.${key}`, options);
  }

  lang(): string {
    return this.#context?.lang as string || this.config.fallback_language;
  }
}
