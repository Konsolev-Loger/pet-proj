const { Category, Product } = require('../../db/models');
class CategoryService {
  static async getAllCategories() {
    return Category.findAll();
  }

  static async getAllCategoriesWithProducts() {
    return Category.findAll({
      include: [{ model: Product }],
    });
  }
}

module.exports =  CategoryService;
