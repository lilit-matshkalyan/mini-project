const {
  RESOURCE_NOT_FOUND
} = require('../../utils/errorDetails');
const { ResourceNotFoundError } = require('../../modules/exceptions');
const ProductService = require('../../services/product/ProductService');

/**
 * Class ProductController
 */
class ProductController {
  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static async create({ data }) {
    const result = await ProductService.create({ data });

    return result;
  }

  /**
     *
     * @param data
     * @param id
     * @returns {Promise.<*>}
     */
  static async update({ data, id }) {
    const product = await ProductService.getById({ id });
    if (!product) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

    const result = await ProductService.update({ data, product });

    return result;
  }

  /**
     *
     * @param id
     * @returns {Promise<void>}
     */
  static async delete({ id }) {
    const resp = await ProductService.delete({ id });

    return resp;
  }

  /**
     *
     * @param queryParams
     * @returns {Promise<any>}
     */
  static async get({ queryParams }) {
    const result = await ProductService.get({ queryParams });

    return result;
  }

  /**
     *
     * @param id
     * @returns {Promise<any>}
     */
  static async getById({ id }) {
    const result = await ProductService.getById({ id });

    return result;
  }
}

module.exports = ProductController;
