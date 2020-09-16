/* eslint-disable func-names */

/**
 * Sequelize Model's definition documentation
 * @see https://sequelize.org/master/manual/models-definition.html
 */

/** Sequelize Model's usage documentation
 * @see https://sequelize.org/master/manual/models-usage.html
 * */

// const { MINI_PROJECT_CORE } = require('../lcp/schemas');
const {
  STORE, PRODUCT
} = require('../lcp/resources');

// id, title, watermark_image
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    STORE.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      watermarkImage: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      timestamps: true,
      // paranoid: true,
      // schema: MINI_PROJECT_CORE,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['id']
        },
        {
          fields: ['title']
        }
      ]
    }
  );

  Store.associate = (models) => {
    Store.hasMany(models.Product, {
      as: PRODUCT.ALIAS.PLURAL,
      foreignKey: 'storeId'
    });
  };


  return Store;
};
