const { Product, Sequelize } = require('../../data/models');
const { PAGINATION, IMAGE_SHAPES, ORDER } = require('../../utils/constants');
const { arrangeSequelizeInterfaceData, cleanEmptyValues } = require('../../utils/helpers');
const StoreService = require('../store/StoreService');
const ImageProcessingService = require('../imageProcessing/ImageProcessingService');

const { Op } = Sequelize;

/**
 * Abstract Class ProductService
 */
class ProductService {
  /**
     *
     * @param data
     * @param transaction
     * @returns {Promise.<*>}
     */
  static async create({ data, transaction }) {
    const { storeId, image: productImage, title } = data;
    const store = await StoreService.getById({ id: storeId });
    const { watermarkImage: storeWatermarkImage } = store;

    const finalImage = await ImageProcessingService.mergeImages({ images: [productImage, storeWatermarkImage], productName: title });

    const result = await Product.create({
      storeId, title, image: finalImage
    }, { transaction });

    ImageProcessingService.resizeAndWriteImage({ image: productImage, imageName: finalImage, shapes: IMAGE_SHAPES.SMALL });
    ImageProcessingService.resizeAndWriteImage({ image: finalImage, imageName: finalImage, shapes: IMAGE_SHAPES.MEDIUM });
    ImageProcessingService.resizeAndWriteImage({ image: finalImage, imageName: finalImage, shapes: IMAGE_SHAPES.LARGE });


    return result;
  }

  /**
   *
   * @param data
   * @param id
   * @returns {Promise<*>}
   */
  static async update({ data, id }) {
    const { storeId, image, title } = data;

    const result = await Product.update(
      cleanEmptyValues({
        storeId, image, title
      }), { where: { id } }
    );

    return result;
  }

  /**
   *
   * @param id
   * @returns {Promise<void>}
   */
  static async delete({ id }) {
    await Product.destroy({ where: { id } });
  }

  /**
   *
   * @param limit
   * @param offset
   * @param order
   * @param sort
   * @param search
   * @returns {Promise<{total: *, data: Honeycode.ResultRows | number | M[] | SQLResultSetRowList | HTMLCollectionOf<HTMLTableRowElement> | string}>}
   */
  static async get({
    queryParams: {
      limit = PAGINATION.LIMIT, offset = PAGINATION.OFFSET, order = ORDER.DESC, sort = 'createdAt', search
    }
  }) {
    let whereCondition = {};

    if (search) {
      whereCondition = {
        title: {
          [Op.like]: `%${search}%`
        }
      };
    }

    let result = await Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [[sort, order]]
    });
    result = arrangeSequelizeInterfaceData({ data: result });

    return result;
  }

  /**
   *
   * @param id
   * @returns {Promise<any>}
   */
  static async getById({ id }) {
    const result = await Product.findByPk(id);

    return result;
  }

  /**
   *
   * @param storeId
   * @returns {Promise<any>}
   */
  static async getProductsByStoreId({ storeId }) {
    const result = await Product.findAndCountAll({
      attributes: ['id', 'image', 'title'],
      where: { storeId }
    });

    return result;
  }
}

module.exports = ProductService;
