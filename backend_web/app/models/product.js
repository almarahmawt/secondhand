'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.User, {
        foreignKey: "id_seller",
      });
      models.Product.hasMany(models.Offering, {
        foreignKey: "id_product",
      });
      models.Product.hasMany(models.Notification, {
        foreignKey: "productId",
      });
      models.Product.hasMany(models.Transaction, {
        foreignKey: "id_product",
      });
    }
  }
  Product.init({
    id_seller: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    image_1: DataTypes.STRING,
    image_2: DataTypes.STRING,
    image_3: DataTypes.STRING,
    image_4: DataTypes.STRING,
    status : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};