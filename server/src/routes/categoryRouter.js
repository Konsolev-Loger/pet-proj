const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/categoryController');

categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.get('/withProducts', CategoryController.getAllCategoriesWithProducts);

module.exports = categoryRouter;
