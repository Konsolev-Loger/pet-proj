const { Order } = require('../../db/models');

class OrderService {
  static async getAllOrders() {
    const orders = await Order.findAll();
    return orders;
  }

  // static async getOrderByUserId(userId) {
  //   const order = await Order.findOne({ where: { userId } });
  //   return order;
  // }
  static async getOrdersByUserId(userId) {
    return Order.findAll({
      where: { userId },
      // attributes: ['id', 'items', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
  }

  // static async createOrder(userId) {
  //   const order = await Order.create({ userId });
  //   return order;
  // }
  static async createOrder(userId, cartItems) {
    const order = await Order.create({
      userId,
      items: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        imgurl: item.imgurl,
        price: item.price,
      })),
    });

    return order;
  }
}

module.exports = OrderService;
