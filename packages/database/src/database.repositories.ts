import { TABLE } from './database.constant';
import { registerSequelizeProvider } from './database.util';

import { NotificationEntity } from './entities/notifications/notification.entity';
import { NotificationTemplateEntity } from './entities/notifications/notification-template.entity';
import { InAppNotificationEntity } from './entities/notifications/inapp-notification.entity';
import { OTPSecretEntity } from './entities/notifications/otp-secret.entity';
import { OTPVerificationEntity } from './entities/notifications/otp-verification.entity';


// Notification.Service
export const NotificationRepository = registerSequelizeProvider(TABLE.NOTIFICATION, NotificationEntity);
export const NotificationTemplateRepository = registerSequelizeProvider(TABLE.NOTIFICATION_TEMPLATE, NotificationTemplateEntity);
export const InAppNotificationRepository = registerSequelizeProvider(TABLE.IN_APP_NOTIFICATION,InAppNotificationEntity );
export const OTPSecretRepository = registerSequelizeProvider(TABLE.OTP_SECRET, OTPSecretEntity);
export const OTPVerficationRepository = registerSequelizeProvider(TABLE.OTP_VERIFICATION, OTPVerificationEntity);
