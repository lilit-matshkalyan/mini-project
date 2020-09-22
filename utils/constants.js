const HTTP_STATUS_METHODS = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  serviceNotAvailable: 503
};

const PAGINATION = {
  LIMIT: 50,
  OFFSET: 0
};

const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC'
};

const IMAGE_SHAPES = {
  SMALL: {
    size: 'small',
    width: 120,
    height: 120
  },
  MEDIUM: {
    size: 'medium',
    width: 640,
    height: 480
  },
  LARGE: {
    size: 'large',
    width: 1024,
    height: 768
  }
};


module.exports = {
  HTTP_STATUS_METHODS,
  IMAGE_SHAPES,
  PAGINATION,
  ORDER
};
