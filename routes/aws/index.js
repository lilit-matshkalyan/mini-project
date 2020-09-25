const Router = require('koa-router');
const AWSController = require('../../controllers/aws/AWSController');


const router = new Router({
  prefix: '/aws'
});


router.post('/', async (ctx) => {
  const result = await AWSController.create({ data: { ...ctx.request.body } });

  return ctx.created(result);
});

router.get('/', async (ctx) => {
  const result = await AWSController.get({ data: { ...ctx.request.body } });

  return ctx.created(result);
});


module.exports = router;
