import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class MomentHelper {

  /**
   * Check if the given date is after the current time.
   * @param dateTime The date to check.
   * @returns {boolean} True if the date is passed, false otherwise.
   */
  isAfter(dateTime: Date): boolean {
    return moment().isAfter(dateTime);
  }

  /**
   * Check if the given date is before the current time.
   * @param dateTime The date to check.
   * @returns {boolean} True if the date is before datetime, false otherwise.
   */
  isBefore(dateTime: Date): boolean {
    return moment().isBefore(dateTime);
  }

  /**
   * Add the expiry period to the current time.
   * @param expiryPeriod The amount of time to add, in seconds.
   * @returns {Date} The expiration date calculated.
   */
  addExpiryPeriod(expiryPeriod: moment.DurationInputArg1, type: moment.DurationInputArg2): Date {
    return moment().add(expiryPeriod, type).toDate();
  }

  addDaysToDate(days: number): string {
    return moment().add(days, 'days').toISOString();
  }
}