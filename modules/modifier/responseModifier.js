const set = require('lodash/set');
const { PAGINATION: { LIMIT, OFFSET } } = require('../../utils/constants');
/**
 * Middleware for modify response
 * you can set response body for the following ways:
 *    1. ctx.ok(users)
 *    2. ctx.ok({ data: users })
 *    3. ctx.ok({ data: users, meta: { refreshToken } })
 *    4. ctx.ok({ meta: { refreshToken } })
 * In any case the actual response will be { data: {}, meta: {} } except for the
 *   following conditions:
 *    - when status code > = 204 and status code < 400 at the same time or status code = 405
 *    in this cases actual response will be undefined
 * @param {Koa.Context} ctx - koa context
 * @returns {undefined} undefined
 */

const mobileModifier = (ctx) => {
  if ((ctx.status >= 204 && ctx.status < 400) || ctx.status === 405 || !ctx.body) return;
  let result = ctx.body;
  if (result && result.dataValues) {
    result = result.dataValues;
  }
  const response = {};
  let pagination = null;
  if (Array.isArray(result.data) && result.total) {
    pagination = {};
    set(pagination, 'limit', parseInt(ctx.request.query.limit, 10) || LIMIT);
    // if offset not provided , it should be null,
    // but offset of s3 request is not number  so I can't parse to the request offset
    set(pagination, 'offset', parseInt(ctx.request.query.offset, 10) || OFFSET);
    set(pagination, 'total', result.total);
    // set(response, 'pagination', pagination);
  }
  if (result.status && typeof result.status === 'number') {
    set(ctx, 'status', result.status);
    delete result.status;
  }
  if (!result.data && !result.meta) result.data = { ...result };
  if (!result.meta && result.data) result.meta = {};

  set(response, 'meta', {
    pagination,
    ...result.meta
  });
  set(response, 'data', result.data);
  ctx.body = response;
};


module.exports = (ctx) => {
  mobileModifier(ctx);
};
