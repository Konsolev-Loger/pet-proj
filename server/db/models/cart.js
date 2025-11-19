const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
      Cart.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      // items: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
