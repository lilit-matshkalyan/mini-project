exports.createProductRequestBodySchema = {
  storeId: { type: 'string', optional: false, empty: false },
  title: { type: 'string', optional: false, empty: false },
  image: { type: 'string', optional: false, empty: false }
};


exports.updateProductRequestBodySchema = {
  storeId: { type: 'string', optional: true, empty: false },
  title: { type: 'string', optional: true, empty: false },
  image: { type: 'string', optional: true, empty: false }
};


exports.createStoreRequestBodySchema = {
  title: { type: 'string', optional: false, empty: false },
  watermarkImage: { type: 'string', optional: false, empty: false }
};


exports.updateStoreRequestBodySchema = {
  title: { type: 'string', optional: true, empty: false },
  watermarkImage: { type: 'string', optional: true, empty: false }
};
