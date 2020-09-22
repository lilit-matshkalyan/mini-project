const { Store, Sequelize } = require('../../data/models');
const { PAGINATION, ORDER } = require('../../utils/constants');
const { arrangeSequelizeInterfaceData } = require('../../utils/helpers');

const { Op } = Sequelize;

/**
 * Abstract Class StoreService
 */
class StoreService {
  /**
     *
     * @param data
     * @param transaction
     * @returns {Promise.<*>}
     */
  static async create({ data, transaction }) {
    const result = await Store.create(data, { transaction });

    return result;
  }

  /**
     *
     * @param data
     * @param store
     * @returns {Promise.<*>}
     */
  static async update({ data, store }) {
    const result = await store.update(data);

    return result;
  }

  /**
     *
     * @param data
     * @returns {Promise<*>}
     */
  static async upsert({ data }) {
    const store = await Store.upsert(
      data,
      { returning: true }
    );

    return store;
  }

  /**
     *
     * @param id
     * @returns {Promise<void>}
     */
  static async delete({ id }) {
    await Store.destroy({ where: { id } });
  }

  /**
     *
     * @param limit
     * @param offset
     * @param order
     * @param sort
     * @param search
     * @returns {Promise.<*>}
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

    let result = await Store.findAndCountAll({
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
     * @returns {Promise.<*>}
     */
  static async getById({ id }) {
    const result = await Store.findByPk(id);

    return result;
  }
}

module.exports = StoreService;
