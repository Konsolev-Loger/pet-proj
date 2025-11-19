const NewsService = require('../services/newsService');
const formatResponse = require('../utils/formatResponse');

class NewsController {
  static async getAllNews(req, res) {
    try {
      const news = await NewsService.getAllNews();
      return res.status(200).json(formatResponse(200, 'News found', news, null));
    } catch (error) {
      console.log(error);
    }
    return res.status(500).json(formatResponse(500, 'Server error', null));
  }
}

module.exports = NewsController;
