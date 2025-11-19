const CategoryService = require('../services/categoryService');
const formatResponse = require('../utils/formatResponse');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json(formatResponse(200, 'Categories found', categories, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }

  static async getAllCategoriesWithProducts(req, res) {
    try {
      const categories = await CategoryService.getAllCategoriesWithProducts();
      return res.status(200).json(formatResponse(200, 'Categories found', categories, null));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Server error', null, error));
    }
  }
}

module.exports = CategoryController;
