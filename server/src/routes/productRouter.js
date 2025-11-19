const productRouter = require('express').Router();
const ProductController = require('../controllers/productController');

productRouter.get('/', ProductController.getAllProduct);
productRouter.post('/', ProductController.CreateProduct);
productRouter.get('/:id', ProductController.getOneProductById)
productRouter.delete('/:id', ProductController.DeleteProduct);

module.exports = productRouter;
