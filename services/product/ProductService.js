const jimp = require('jimp');
const uuid = require('uuid');

const { Product, Sequelize } = require('../../data/models');
const { PAGINATION } = require('../../utils/constants');
const { arrangeSequelizeInterfaceData, replaceSpaceInString, cleanEmptyValues } = require('../../utils/helpers');
const StoreService = require('../store/StoreService');

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

    const finalImage = await ProductService.mergeImages({ images: [productImage, storeWatermarkImage], productName: title });

    const result = await Product.create({
      storeId, title, image: finalImage
    }, { transaction });


    return result;
  }

  /**
     *
     * @param images
     * @param productName
     * @returns {Promise.<string>}
     */
  static async mergeImages({ images, productName }) {
    const projectPath = process.env.PWD;

    const imagePromise = jimp.read(`${projectPath}/${images[0]}`);
    const image = await imagePromise;

    const watermarks = await Promise.all(
      images.slice(1, images.length).map(img => jimp.read(`${projectPath}${img}`))
    );


    watermarks.forEach((watermark) => {
      image.blit(watermark, 0, 0);
    });

    const imageId = uuid.v4();

    const imagePath = `images/${imageId}-${replaceSpaceInString({ string: productName, replacement: '-' })}.png`;
    image.write(imagePath);


    return imagePath;
  }

  /**
     *
     * @param data
     * @param product
     * @returns {Promise.<*>}
     */
  static async update({ data, product }) {
    const { storeId, image: productImage, title } = data;

    let finalImage;
    if (productImage) {
      const store = await StoreService.getById({ id: storeId });
      const { watermarkImage: storeWatermarkImage } = store;

      finalImage = await ProductService.mergeImages({ images: [productImage, storeWatermarkImage], productName: title });
    }
    const result = await product.update(cleanEmptyValues({ storeId, image: finalImage, title }));

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
     * @param search
     * @param order
     * @param sort
     * @returns {Promise<{total: *, data: *}>}
     */
  static async get({
    queryParams: {
      limit = PAGINATION.LIMIT, offset = PAGINATION.OFFSET, search, order, sort
    }
  }) {
    const sortOrder = [];
    let whereCondition = {};
    if (order && sort) {
      sortOrder.push([sort, order]);
    }
    if (search) {
      whereCondition = {
        title: {
          [Op.iLike]: `%${search}%`
        }
      };
    }
    let result = await Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: sortOrder.length ? sortOrder : [['createdAt', 'DESC']]
    });
    result = arrangeSequelizeInterfaceData({ data: result });

    return result;
  }

  /**
     *
     * @param id
     * @returns {Promise.<*>}
     */
  static async getById({ id }) {
    const result = await Product.findByPk(id);

    return result;
  }
}

module.exports = ProductService;
