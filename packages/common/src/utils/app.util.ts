import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Determine whether the given `input` is a string.
 *
 * @param {*} input
 *
 * @returns {Boolean}
 */
export const isString = (input: any): boolean => {
  return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]'
}


export function convertToSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1') // Add an underscore before each uppercase letter
    .replace(/^_/, '')          // Remove any leading underscore
    .toLowerCase();             // Convert the entire string to lowercase
}

export const formatCurrency = (amount: number, currency: string, locale: string = 'en-US'): string => {
  const formattedAmount = new Intl.NumberFormat(locale).format(amount);
  return `${formattedAmount} ${currency}`;
}


export const generateSigningSecret = () => {
  return randomBytes(32).toString('hex');
}

export const generateUniqueToken = (): string => {
  return uuidv4();
}

export const replacePlaceholders = (template:string, data:any) => {
  let result = template;
  for (const key in data) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), data[key]);
  }
  return result;
}