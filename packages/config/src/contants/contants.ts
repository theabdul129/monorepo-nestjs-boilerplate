export enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  CI = 'ci',
  STAGE = 'stage',
  PROD = 'prod',
  PREPROD = 'preprod',
}

export const enum QUEUE {
  AUDIT = 'AUDIT_SERVICE_QUEUE',
  NOTIFICATION = 'NOTIFICATION_SERVICE_QUEUE'
}