const {
  RESOURCE_NOT_FOUND
} = require('../../utils/errorDetails');
const { ResourceNotFoundError } = require('../../modules/exceptions');
const ProductService = require('../../services/product/ProductService');
const StoreService = require('../../services/store/StoreService');
const AWSService = require('../../services/aws/AWSService');

/**
 * Class StoreController
 */
class StoreController {
  /**
   *
   * @param data
   * @returns {Promise<*>}
   */
  static async create({ data }) {
    const result = await StoreService.create({ data });

    return result;
  }

  /**
   *
   * @param data
   * @param id
   * @returns {Promise<*>}
   */
  static async update({ data, id }) {
    const store = await StoreService.getById({ id });
    if (!store) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);

    const { id: storeId } = store;
    const { watermarkImage } = data;
    if (watermarkImage) {
      const products = await ProductService.getProductsByStoreId({ storeId });

      AWSService.sendMessageToQueue({
        data: {
          storeId,
          products,
          watermarkImage
        }
      });
    }
    const result = await StoreService.update({ data, store });

    return result;
  }

  /**
   *
   * @param data
   * @returns {Promise<*>}
   */
  static async upsert({ data }) {
    const result = await StoreService.upsert({ data });

    return result;
  }

  /**
   *
   * @param id
   * @returns {Promise<void>}
   */
  static async delete({ id }) {
    const resp = await StoreService.delete({ id });

    return resp;
  }

  /**
   *
   * @param queryParams
   * @returns {Promise<*>}
   */
  static async get({ queryParams }) {
    const result = await StoreService.get({ queryParams });

    return result;
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  static async getById({ id }) {
    const result = await StoreService.getById({ id });

    return result;
  }
}

module.exports = StoreController;
