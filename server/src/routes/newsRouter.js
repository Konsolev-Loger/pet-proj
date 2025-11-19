const newsRouter = require('express').Router();
const NewsController = require('../controllers/newsController');

newsRouter.get('/', NewsController.getAllNews);

module.exports = newsRouter;
