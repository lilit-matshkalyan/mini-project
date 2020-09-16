const isString = require('lodash/isString');
const _ = require('lodash');
const { PAGINATION } = require('./constants');

const parseQueryParams = (params) => {
  let {
    order, filter, offset, limit
  } = params;
  const { search = '', active } = params;
  filter = filter || {};
  filter = isString(filter) ? JSON.parse(filter) : filter;
  offset = offset ? _.toNumber(offset) : PAGINATION.OFFSET;
  limit = limit ? _.toNumber(limit) : PAGINATION.LIMIT;

  order = order || { key: 'createdAt', bool: true };
  order = isString(order) ? JSON.parse(order) : order;
  const final = {
    filter,
    offset,
    limit,
    order,
    active
  };
  final.search = search;
  return final;
};
// export default parseQueryParams;
module.exports = parseQueryParams;
