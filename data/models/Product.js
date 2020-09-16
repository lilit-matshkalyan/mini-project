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
  PRODUCT, STORE
} = require('../lcp/resources');


module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    PRODUCT.MODEL,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      storeId: {
        required: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      title: {
        required: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      image: {
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
          fields: ['storeId']
        },
        {
          fields: ['title']
        }
      ]
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Store, {
      as: STORE.ALIAS.SINGULAR,
      foreignKey: 'storeId'
    });
  };

  return Product;
};
