const cartRouter = require('express').Router();
const CartController = require('../controllers/cartController');
const {verifyAccessToken} = require('../middlewares/veryfyToken');

cartRouter.get('/',verifyAccessToken, CartController.getCard);
cartRouter.post('/',verifyAccessToken, CartController.addItem);
cartRouter.delete('/',verifyAccessToken, CartController.deleteItem);

module.exports = cartRouter;