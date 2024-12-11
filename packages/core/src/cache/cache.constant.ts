import {seconds, minutes, hours, weeks, months} from '@packages/common';
export enum CACHE_TTL {
  THIRTY_SECONDS = seconds(30),
  ONE_MINUTE = minutes(1),
  FIVE_MINUTES = minutes(5),
  FIFTEEN_MINUTES = minutes(15),
  THIRTY_MINUTES = minutes(30),
  ONE_HOUR = hours(1),
  ONE_DAY = hours(24),
  ONE_WEEK = weeks(1),
  ONE_MONTH = months(1),
  ONE_YEAR = 365 * 24 * 60
}
