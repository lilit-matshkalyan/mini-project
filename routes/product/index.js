const Router = require('koa-router');
const {
  RESOURCE_NOT_FOUND
} = require('../../utils/errorDetails');
const validator = require('../../modules/validator/index');
const {
  createProductRequestBodySchema, updateProductRequestBodySchema
} = require('../../modules/validator/validationSchemas');
const { ResourceNotFoundError } = require('../../modules/exceptions');
const ProductController = require('../../controllers/product/ProductController');


const router = new Router({
  prefix: '/product'
});


router.post('/', async (ctx) => {
  await validator.customValidation(ctx.request.body, createProductRequestBodySchema);
  const result = await ProductController.create({ data: { ...ctx.request.body } });

  return ctx.created(result);
});

router.put('/:id', async (ctx) => {
  await validator.customValidation(ctx.request.body, updateProductRequestBodySchema);
  const { id } = ctx.params;

  const result = await ProductController.update({ data: { ...ctx.request.body }, id });

  return ctx.accepted(result);
});

// router.put('/', async (ctx) => {
//   const result = await ProductController.upsert({ data: { ...ctx.request.body } });
//
//   return ctx.created(result);
// });

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params;

  await ProductController.delete({ id });

  return ctx.noContent();
});

router.get('/', async (ctx) => {
  const result = await ProductController.get({ queryParams: { ...ctx.request.query } });

  return ctx.ok(result);
});

router.get('/:id', async (ctx) => {
  const { id } = ctx.params;

  const result = await ProductController.getById({ id });
  if (!result) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

  return ctx.ok(result);
});


module.exports = router;
