require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DBNAME: process.env.DB_NAME,
  DBHOST: process.env.DB_HOST,
  DBUSER: process.env.DB_USER,
  DBPASS: process.env.DB_PASS,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  BASE_URL: process.env.BASE_URL
};
