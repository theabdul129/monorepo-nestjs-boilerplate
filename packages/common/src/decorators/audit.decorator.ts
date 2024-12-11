import { SetMetadata } from '@nestjs/common';

export const METHOD_AUDIT_METADATA: string = 'METHOD_AUDIT_METADATA';

/**
 * Audit options
 */
export interface AuditOptions {
  /**
   * Audit options
   */
  code: string;
  description: string;
  mask?: AuditMaskingOptions
}

/**
 * Masking options
 */
export interface AuditMaskingOptions {
  /**
   * Mask of the request body. It can be a boolean or an array of strings.
   * If it is true, it will mask all the body.
   * If it is an array of strings, it will mask only the specified fields.
   */
  request?: string[] | boolean;
  /**
   * Mask of the response body. It can be a boolean or an array of strings.
   * If it is true, it will mask all the body.
   * If it is an array of strings, it will mask only the specified fields.
   */
  response?: string[] | boolean;
}
/**
 * Audit decorator. It allows to customise audit behaviour for each route.
 * @param options the auditing options
 */
export const Audit = (options: AuditOptions) => SetMetadata(METHOD_AUDIT_METADATA, options);
