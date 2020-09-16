const Router = require('koa-router');
const {
  RESOURCE_NOT_FOUND
} = require('../../utils/errorDetails');
const validator = require('../../modules/validator/index');
const {
  createStoreRequestBodySchema, updateStoreRequestBodySchema
} = require('../../modules/validator/validationSchemas');
const { ResourceNotFoundError } = require('../../modules/exceptions');
const StoreController = require('../../controllers/store/StoreController');


const router = new Router({
  prefix: '/store'
});


router.post('/', async (ctx) => {
  await validator.customValidation(ctx.request.body, createStoreRequestBodySchema);
  const result = await StoreController.create({ data: { ...ctx.request.body } });

  return ctx.created(result);
});

router.put('/:id', async (ctx) => {
  await validator.customValidation(ctx.request.body, updateStoreRequestBodySchema);
  const { id } = ctx.params;

  const result = await StoreController.update({ data: { ...ctx.request.body }, id });

  return ctx.accepted(result);
});

// router.put('/', async (ctx) => {
//   const result = await StoreController.upsert({ data: { ...ctx.request.body } });
//
//   return ctx.created(result);
// });

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  await StoreController.delete({ id });

  return ctx.noContent();
});

router.get('/', async (ctx) => {
  const result = await StoreController.get({ queryParams: { ...ctx.request.query } });

  return ctx.ok(result);
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  const result = await StoreController.getById({ id });
  if (!result) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

  return ctx.ok(result);
});


module.exports = router;
