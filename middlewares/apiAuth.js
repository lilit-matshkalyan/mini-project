const { AccessDeniedError } = require('../modules/exceptions/index');

const { authConfig } = require('../config');

module.exports = async (ctx, next) => {
  if (ctx.request.headers.apikey !== authConfig.apiAuthSecretKey) {
    throw new AccessDeniedError({ message: 'You have not access to this api. Go back and enjoy your life.' });
  }
  await next();
};
