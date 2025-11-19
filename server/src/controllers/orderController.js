const OrderService = require('../services/orderService');
const formatResponse = require('../utils/formatResponse');

class OrderController {
  static async getAllOrderss(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      return res.status(200).json(formatResponse(200, 'Orders found', orders, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }
  // ================================================================================

  static async getOrderByUserId(req, res) {
    const { user } = res.locals;
    const { cartItems } = req.body;
    try {
      const order = await OrderService.getOrdersByUserId(user.id, cartItems);
      if (!order)
        return res
          .status(404)
          .json(formatResponse(404, 'Order not found', null, 'Order not found'));
      return res.status(200).json(formatResponse(200, 'Order found', order, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }

  // ================================================================================
  // static async createOrder(req, res) {
  //   try {
  //     const { user } = res.locals;
  //     const order = await OrderService.createOrder(user.id);
  //     return res.status(201).json(formatResponse(201, 'Order created', order, null));
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(formatResponse(500, 'Server error', null, error));
  //   }
  // }
  static async createOrder(req, res) {
    try {
      const { user } = res.locals;
      const { items } = req.body;
      if (!user?.id) {
        return res.status(403).json(formatResponse(403, 'Forbidden', null, 'No user'));
      }
      if (!Array.isArray(items) || items.length === 0) {
        return res
          .status(400)
          .json(formatResponse(400, 'Bad request', null, 'Cart is empty'));
      }
      const order = await OrderService.createOrder(user.id, items);
      return res
        .status(201)
        .json(formatResponse(201, 'Order created', { orderId: order.id }, null));
    } catch (error) {
      console.error('Create order error:', error);
      return res
        .status(500)
        .json(formatResponse(500, 'Server error', null, error.message));
    }
  }
}

module.exports = OrderController;
