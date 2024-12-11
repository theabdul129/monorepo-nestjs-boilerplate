import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PlainValidatorHelper {

  async validate<T>(dtoClass: ClassConstructor<T>, dtoInput: any): Promise<{ success: boolean; errors?: any[] }> {
    const dtoInstance: any = plainToClass(dtoClass, dtoInput);
    const errors = await validate(dtoInstance, {
      stopAtFirstError: true,
      whitelist: true
    });

    if (errors.length > 0) {
      return { success: false, errors: errors };
    }
    return { success: true, errors: [] };
  }
}
