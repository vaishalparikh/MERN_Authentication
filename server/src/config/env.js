require('dotenv').config();

module.exports = {
  APP_PORT: process.env.APP_PORT || '8080',
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  TWILIO_ACCOUNT_SID: process.env.ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.AUTH_TOKEN,
  TWILIO_NUMBER : process.env.TWILIO_NUMBER,
};
