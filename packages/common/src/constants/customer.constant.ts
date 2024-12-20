export enum CUSTOMER_STATUSES {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
};

export enum HEADER_CONSTANTS {
  X_DEVICEID = 'X-DEVICEID',
  X_SIGNATURE = 'X-SIGNATURE',
  X_AUTH_TOKEN = 'X-AUTHTOKEN'
};

export enum AUTH_FLOW {
  LOGIN = 'LOGIN',
  FIRST_TIME_LOGIN = 'FIRST_TIME_LOGIN',
  REGISTRATION = 'REGISTRATION',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
};

export enum CUSTOMER_SESSION_STATUSES {
  PARTIAL = 'PARTIAL',
  FULL = 'FULL',
  ACTIVE = 'ACTIVE'
};

export enum FACTOR {
  VERIFY_OTP = 'VERIFY_OTP',
  VERIFY_PIN = 'VERIFY_PIN',
  SET_PIN = 'SET_PIN',
};

