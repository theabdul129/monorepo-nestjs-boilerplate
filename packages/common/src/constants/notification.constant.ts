export enum RMQ_SERVICE {
  NOTIFICATON_RMQ_SERVICE = 'NOTIFICATON_RMQ_SERVICE', 
}

export enum RMQ_SERVICE_EVENTS {
  SEND_EMAIL = 'SEND_EMAIL', 
  SEND_PUSH = 'SEND_PUSH',
  SEND_SMS = 'SEND_SMS',
  SEND_OTP = 'SEND_OTP',
  VERIFY_OTP = 'VERIFY_OTP'
}

export enum NOTIFICATION_TYPE {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
  OTP = 'OTP'
}

export enum NOTIFICATION_STATUS {
  PENDING = 'PENDING', 
  SENT = 'SENT', 
  FAILED = 'FAILED',
}

export enum OTP_STATUS {
  PENDING = 'PENDING', 
  VERIFIED = 'VERIFIED', 
}
