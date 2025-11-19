const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      //  Order → User (один заказ — один пользователь)
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      items: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
