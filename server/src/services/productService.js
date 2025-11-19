const { Product } = require('../../db/models');

class ProductService {
  static async getAllProduct() {
    return Product.findAll();
  }

  static async getOneProduct(id) {
    return Product.findByPk(id);
  }

  static async CreateProduct({ name, description, price, img, categoryId, stockCount }) {
    return Product.create({ name, description, price, img, categoryId, stockCount });
  }

  static async DeleteProduct(id, ownerId) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    if (product.userId !== ownerId) throw new Error('Нет прав');
    return product.destroy();
  }

  static async decrementStock(productId, quantity) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    if (product.stockCount < quantity) throw new Error('Товар закончился');

    product.stockCount -= quantity;
    await product.save();

    return product;
  }
}

module.exports = ProductService;
