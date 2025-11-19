const { Cart, Product } = require('../../db/models');
const ProductService = require('./productService');

class CartService {
  static async getCart(userId) {
    const cart = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    return cart;
  }

  // ===============================================================================
  static async clearCart(userId) {
    // 1. Получаем все товары в корзине
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    // if (cartItems.length === 0) {
    //   return { cleared: true, restoredProducts: [] };
    // }
    // 2. Возвращаем количество на склад
    const restoredProducts = [];
    for (const item of cartItems) {
      const product = item.Product;
      product.stockCount += item.quantity;
      product.save();

      restoredProducts.push({
        id: product.id,
        stockCount: product.stockCount,
      });
    }
    // 3. Удаляем ВСЕ записи корзины
    await Cart.destroy({ where: { userId } });
    // return {
    //   cleared: true,
    //   restoredProducts,
    // };
  }
  // ===============================================================================

  static async addCart(userId, productId, quantity = 1) {
    // 1. Уменьшаем stockCount
    const updatedProduct = await ProductService.decrementStock(productId, quantity);

    // 2. Проверяем, есть ли уже в корзине
    const existItem = await Cart.findOne({
      where: { userId, productId },
    });

    let cartItem;
    if (existItem) {
      existItem.quantity += quantity;
      cartItem = await existItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    // 3. Возвращаем и cartItem, и updatedProduct
    return {
      cartItem,
      updatedProduct,
    };
  }
}

module.exports = CartService;
