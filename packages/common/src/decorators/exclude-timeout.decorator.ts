import { SetMetadata } from '@nestjs/common';

export const IS_EXCLUDE_TIMEOUT_KEY = 'IS_EXCLUDE_TIMEOUT';
export const ExcludeTimeout = () => SetMetadata(IS_EXCLUDE_TIMEOUT_KEY, true);
