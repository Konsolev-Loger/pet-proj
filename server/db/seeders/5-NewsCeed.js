const news = [
  {
    title: 'Новинка Molotow Burner outline Black',
    content:
      'Линейка Burner от Molotow продолжает развиваться, и мы получили новый черный баллон в объеме 500 мл, который создан для мгновенного контура по свежему хрому.',
    imgurl: './news1.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Виртуальная галерея Time for Art',
    content:
      'TIME FOR ART открыли свою виртуальную галерею уличного искусства! Лично нам понравилось, интересно прогуляться и посмотреть качественные работы, заходите и вы - сайт с галареей',
    imgurl: './Галерея.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Allcity Flow Ink [Новинка]',
    content:
      'Перманентные чернила Allcity - это то, чего так не хватало - отличное качество по низкой цене. При разработке заправок учли все тонкости использования с маркерами и сквизерами.',
    imgurl: './Чернила.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('News', news, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('News', null, {});
  },
};
