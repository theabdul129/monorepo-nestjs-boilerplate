import { Injectable } from '@nestjs/common';
import * as hijriMoment from 'moment-hijri';
hijriMoment.locale('en');

@Injectable()
export class UtilsService {


  isHijriDate(dateString: string): boolean {
    const date = hijriMoment(dateString, 'iYYYY-iMM-iDD', true);
    return date?.isValid() || false;
  }

  hijriTogregorian(hijriDate: string): string {
    return hijriMoment(hijriDate, 'iYYYY-iMM-iDD').format('YYYY-MM-DD');
  }
}
