const _ = require('lodash');
const { PAGINATION, ORDER } = require('./constants');


const parseQueryParams = (params) => {
  let {
    order, sort, offset, limit
  } = params;
  const { search } = params;
  offset = offset ? _.toNumber(offset) : PAGINATION.OFFSET;
  limit = limit ? _.toNumber(limit) : PAGINATION.LIMIT;

  order = order || ORDER.DESC;
  sort = sort || 'createdAt';

  const final = {
    search,
    offset,
    limit,
    order,
    sort
  };
  final.search = search;
  return final;
};
// export default parseQueryParams;
module.exports = parseQueryParams;
