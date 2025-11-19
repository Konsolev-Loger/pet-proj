const CartService = require('../services/cartService1');
const formatResponse = require('../utils/formatResponse');

class CartController {
  static async getCard(req, res) {
    const { user } = res.locals;
    try {
      const cart = await CartService.getCart(user.id);
      return res.status(200).json(formatResponse(200, 'Cart found', cart, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }

  // =======================================================================
  static async deleteItem(req, res) {
    // const { productId } = req.params;
    const { user } = res.locals;
    try {
      const cart = await CartService.clearCart(user.id);
      return res.status(200).json(formatResponse(200, 'Cart clear', cart, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }
  // =======================================================================

  // static async addItem(req, res) {
  //   // const { productId } = req.params;
  //   const { productId, quantity } = req.body;
  //   const { user } = res.locals;
  //   try {
  //     const cartItem = await CartService.addCart(user.id, productId, quantity);
  //     return res.status(200).json(formatResponse(200, 'Item added', cartItem, null));
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(formatResponse(500, 'Server error', null, error));
  //   }
  // }
  // =======================================================================

  static async addItem(req, res) {
    const { productId, quantity = 1 } = req.body;
    const { user } = res.locals;
    try {
      const result = await CartService.addCart(user.id, productId, quantity);
      return res.status(200).json(formatResponse(200, 'Item added', result, null));
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json(formatResponse(400, error.message, null, error.message));
    }
  }
}

module.exports = CartController;
