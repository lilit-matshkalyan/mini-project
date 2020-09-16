const envConfigs = require('dotenv');

envConfigs.config({ path: `${__dirname}/../.env` });

const elkLogging = process.env.ELK_LOGGING;

const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  logging: Boolean(parseInt(process.env.DB_LOGGING, 10)) || false
};

const serverConfig = {
  host: process.env.HOST,
  port: process.env.PORT
};

const authConfig = {
  apiAuthSecretKey: process.env.API_KEY,
  authTokenSecret: process.env.AUTHORIZATION_TOKEN_SECRET || 'LOCAL_SECRET_KEY',
  resetPasswordTokenSecret: process.env.RESETPASSWORD_TOKEN_SECRET || 'EMAIL_SECRET_KEY'
};

const awsConfig = {
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    ACL: 'public-read',
    Bucket: 'one-fraction',
    BucketFolder: 'images',
    contentType: 'binary/octet-stream'
  },
  allowedExtensions: ['jpeg', 'jpg', 'svg', 'png', 'pdf', 'docx'],
  rootFolders: {
    jpeg: 'images',
    jpg: 'images',
    svg: 'images',
    png: 'images',
    pdf: 'documents',
    docx: 'documents'
  }
};

const mailerConfig = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};

const whiteList = process.env.CORS_WHITE_LIST;

module.exports = {
  AUTHORIZATION_TOKEN_SECRET: process.env.AUTHORIZATION_TOKEN_SECRET || 'LOCAL_SECRET_KEY',
  RESETPASSWORD_TOKEN_SECRET: process.env.RESETPASSWORD_TOKEN_SECRET || 'EMAIL_SECRET_KEY',
  mailerConfig,
  serverConfig,
  elkLogging,
  authConfig,
  awsConfig,
  whiteList,
  dbConfig
};
