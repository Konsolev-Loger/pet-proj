const { News } = require('../../db/models');

class NewsService {
  static async getAllNews() {
    const news = await News.findAll();
    return news;
  }
}

module.exports = NewsService;
