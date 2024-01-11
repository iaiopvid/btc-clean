import 'dotenv/config';

const environment = process.env;

export const env = {
  PORT: environment.PORT || 5000,
  MONGOURI: environment.MONGOURI,
  JWT_SECRET_STRING: environment.JWT_SECRET_STRING,
  AWS_ACCESS_KEY_ID: environment.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: environment.AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION: environment.AWS_DEFAULT_REGION,
  AWS_BUCKET_NAME: environment.AWS_BUCKET_NAME,
  MAX_UPLOAD_SIZE: Number(environment.MAX_UPLOAD_SIZE) || 1024 * 1024 * 4,
  nodeEnv: environment.NODE_ENV,
  vimeoApiKey: environment.VIMEO_API_KEY || '',
  youTubeApiKey: environment.YOUTUBE_API_KEY || '',
  AWS_COLD_TOPICS_URI: environment.AWS_COLD_TOPICS_URI || '',
  AWS_HOT_TOPICS_URI: environment.AWS_HOT_TOPICS_URI || '',
  twilioSendGridSecretKey: environment.TWILLIO_SEND_GRID_SECRET_KEY || '',
  medcofRecoveryUrl: environment.MEDCOF_RECOVERY_URL || '',
  qbankApiUrl: environment.QBANK_API_URL || '',
  qbankApiKey: environment.QBANK_API_KEY || '',
  ssoApiHost: environment.SSO_API_HOST || '',
  ssoClientId: environment.SSO_CLIENT_ID || '',
  ssoClientSecret: environment.SSO_CLIENT_SECRET || '',
  mysqlDbUrl: environment.MYSQL_DATABASE_URL || '',
  sentryDsn: environment.SENTRY_DSN || '',
};
