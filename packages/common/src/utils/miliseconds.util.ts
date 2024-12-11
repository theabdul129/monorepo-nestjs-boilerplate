export function seconds(num: number): number {
  return num * 1000;
}

export function minutes(num: number): number {
  return num * 60 * 1000;
}

export function hours(num: number): number {
  return num * 60 * 60 * 1000;
}

export function days(num: number): number {
  return num * 24 * 60 * 60 * 1000;
}

export function weeks(num: number): number {
  return num * 7 * 24 * 60 * 60 * 1000;
}

export function months(num: number): number {
  return num * 30.44 * 24 * 60 * 60 * 1000; // Approximate month length
}

export function years(num: number): number {
  return num * 365.25 * 24 * 60 * 60 * 1000; // Approximate year length accounting for leap years
}
