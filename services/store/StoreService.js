const { Store, Sequelize } = require('../../data/models');
const { PAGINATION } = require('../../utils/constants');
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
    let result = await Store.findAndCountAll({
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
    const result = await Store.findByPk(id);

    return result;
  }
}

module.exports = StoreService;
