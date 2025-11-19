const ProductService = require('../services/productService');
const formatResponse = require('../utils/formatResponse');

class ProductController {
  static async getAllProduct(req, res) {
    try {
      const product = await ProductService.getAllProduct();
      if (product.length === 0)
        return res
          .status(404)
          .json(formatResponse(404, 'Products not found', null, 'Products not found'));
      return res.status(200).json(formatResponse(200, 'Products found', product, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }

  // ===========================================================================================
  static async getOneProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.getOneProduct(id)
      if(!product) return res.status(404).json(formatResponse(404, 'Product not found', null, 'Products not found'))
        return res.status(200).json(formatResponse(200, 'Product found', product, null))
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server eror', null, error));
    }
  }

  // ===========================================================================================
  static async CreateProduct(req, res) {
    const { user } = res.locals;
    const { name, description, price, img, stockCount } = req.body;
    if (!req.body)
      return res
        .status(400)
        .json(formatResponse(400, 'Bad request', null, 'Bad request'));
    try {
      const product = ProductService.CreateProduct({
        name,
        description,
        price,
        img,
        categoryId: user.id,
        stockCount,
      });
      return res.status(201).json(formatResponse(201, 'Product created', product, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }
  // ===========================================================================================

  static async DeleteProduct(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
    try {
      const product = await ProductService.DeleteProduct(id, user.id);
      if (!product)
        return res
          .status(404)
          .json(formatResponse(404, 'Product not found', null, 'Product not found'));
      return res.status(200).json(formatResponse(200, 'Product deleted', null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }
}

module.exports = ProductController;
