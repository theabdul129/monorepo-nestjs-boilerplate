import { UnprocessableEntityException } from '@nestjs/common';
import { I18nHelper } from '../helpers/i18n.helper';

interface IError {
  name: string;
  message: string;
  developerMessage?: string;
  field: string;
  value: string;
}
export class ValidationException extends UnprocessableEntityException {
  constructor(private __errors: any, private i18n: I18nHelper) {
    super();
  }

  get errors(): IError[] {
    return this.__errors.reduce((accumulator: any, error: any) => {
      const result = [];
      for (const key in error.constraints) {
        if(error.contexts?.[key]?.errorCode) {
          const { errorCode, developerMessage }  = error.contexts?.[key];
          result.push({
            name: errorCode,
            message: this.i18n.t(errorCode) || error.constraints[key],
            developerMessage: developerMessage || error.constraints[key],
            field: error.property,
            value: error.value
          });
        } else {
          result.push({
            name: `${error.property}_${key}`.toUpperCase(),
            message: error.constraints[key],
            developerMessage: error?.contexts?.[key]?.developerMessage || error.constraints[key],
            field: error.property,
            value: error.value
          });
        }

      }
      return [...result, ...accumulator];
    }, []);
  }
}
