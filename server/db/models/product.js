const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Product → Category (один продукт — одна категория)
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      // Product → Cart (один продукт — много элементов корзины)
      Product.hasMany(models.Cart, {
        foreignKey: 'productId',
      });
      // Product → User через Cart (один продукт — много пользователей через корзину)
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'productId',
        otherKey: 'userId',
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      img: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      stockCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
