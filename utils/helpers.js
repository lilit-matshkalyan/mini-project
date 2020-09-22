/**
 @TODO change exports. style to Abstract Class or any singletone export
 *  there is an issue related reuse this functions inside this module, needed context specification with this style
 */

/**
 * arrange custom query response of sequelize
 * @param {String} queryData - query's data
 * @param {Object} queryParams - query's params
 * @returns {Object} params
 */
exports.arrangeSequelizeQueryData = ({ queryData }) => ({
  data: queryData[1].rows,
  total: queryData[1].rows[0] ? parseInt(queryData[1].rows[0].total, 10) : 0
});

/**
 * arrange custom query response of sequelize
 * @param {String} queryData - query's data
 * @param {Object} queryParams - query's params
 * @returns {Object} params
 */
exports.arrangeSequelizeInterfaceData = ({ data }) => ({
  data: data.rows,
  total: data.count
});

/**
 *
 * @param data
 * @returns {{total: number, data: *}}
 */
exports.arrangeSequelizeInterfaceArrayData = ({ data }) => ({
  data,
  total: parseInt(data[0].total, 10)
});

/**
 *
 * @param obj
 * @returns {*}
 */
exports.cleanEmptyValues = (obj) => {
  const newObj = Object.create(null);
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value && value instanceof Array && value.length > 0) {
      newObj[key] = value;
    } else if (value && value instanceof Object && Object.entries(value).length > 0) {
      newObj[key] = value;
    } else if (value && value instanceof Date) {
      newObj[key] = value;
    } else if (value && Object(value) !== value) {
      newObj[key] = value;
    }
  });
  if (Object.entries(newObj).length === 0) {
    return null;
  }
  return newObj;
};
/**
 *
 * @param string
 * @param replacement
 * @returns {string|XML|*|void}
 */
exports.replaceSpaceInString = ({ string, replacement }) => {
  const newString = string.replace(/\s/g, `${replacement}`);

  return newString;
};
