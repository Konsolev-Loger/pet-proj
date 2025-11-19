const OrderController = require('../controllers/orderController');
const { verifyAccessToken } = require('../middlewares/veryfyToken');
const orderRouter = require('express').Router();

orderRouter.get('/', OrderController.getAllOrderss);
orderRouter.get('/', verifyAccessToken, OrderController.getOrderByUserId);
orderRouter.post('/', verifyAccessToken, OrderController.createOrder);

module.exports = orderRouter;
