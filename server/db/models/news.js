const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate() {}
  }
  News.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      imgurl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'News',
    },
  );
  return News;
};
