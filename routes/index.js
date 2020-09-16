/* eslint-disable func-names */
const Router = require('koa-router');


const router = new Router({
  prefix: '/api'
});


const storeRouter = require('./store');
const productRoutes = require('./product');
// .import


router.use(storeRouter.routes());
router.use(productRoutes.routes());
// .use


router.get('/ping', async ctx => ctx.ok('pong v1.0.0'));

module.exports = function (app) {
  // app.use(apiAuth);
  app.use(router.routes());
  app.use(router.allowedMethods());
};
