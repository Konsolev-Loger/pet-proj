const products = [
  {
    name: 'Краска-Montana-Black, Розовый, 400мл',
    description:
      'Аэрозольная краска Montana BLACK не зря признана лучшим иструментом для творчества в своем классе — она обладает высоким качеством, подходят для использования на любых поверхностях, в любую погоду и даже в сибирские морозы, при этом обладают разумной стоимостью.',
    price: 450,
    img: 'мтн-розовый.png',
    // img: './мтн-розовый.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска-Flame-Blue, Голубой, 400мл',
    description:
      'Аэрозольная краска Flame Blue с формулой на акриловой основе с низким давлением и палитрой из 120 цветов, включая 4 флуоресцентных и 2 полу-прозрачных(transparent) цвета.',
    price: 450,
    img: 'Flame-blue.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска ARTON, Синий, 700 мл',
    description:
      'Arton всегда доступен, всегда хорош и радует богатой палитрой матовых цветов! На Январь 2020 доступно 117 цветов (включая глянцевый чёрный, глянцевый белый и хром)',
    price: 650,
    img: 'Arton-blue.jpg',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска ARTON, Оранжевый, 400 мл',
    description:
      'Arton всегда доступен, всегда хорош и радует богатой палитрой матовых цветов! На Январь 2020 доступно 117 цветов (включая глянцевый чёрный, глянцевый белый и хром)',
    price: 500,
    img: './Arton-orange.jpg',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска Molotow Coversall Water Based, Голубой 400 мл',
    description:
      'Аэрозольная краска Molotow Coversall Water Based - обладает слабым запахом и рассчитана на быстрое нанесение, благодаря большому давлению.',
    price: 450,
    img: './Mtn-blue-water.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска Flame Blue Neon, Розовый 400 мл',
    description:
      'Аэрозольная краска Flame Blue с формулой на акриловой основе с низким давлением и палитрой из 120 цветов, включая 4 флуоресцентных и 2 полу-прозрачных(transparent) цвета.Все цвета Flame Blue матовые, кроме хрома, золота и меди. Удобная регулировка низкого давления кэпом. Благодаря новой формуле укрываемая одним баллоном площадь увеличилась на 18%.',
    price: 500,
    img: './Flame-Blue-Neon.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска Flame Orange Черный 600 мл',
    description:
      'Профессиональная аэрозольная краска MTN 94 Spectro - полу-прозрачная краска для передачи дополнительных деталей и тонировок.',
    price: 550,
    img: './Flame-Orange.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Краска Molotow Premium Аква 400 мл',
    description:
      'Легендарная аэрозольная краска, которой отдают предпочтение очень многие художники со всего мира.',
    price: 500,
    img: './Moloto-premium.png',
    categoryId: 1,
    stockCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ==================================================
  // {
  //   name: 'Product 2',
  //   description: 'Description of Product 2',
  //   price: 500,
  //   img: 'https://example.com/product2.jpg',
  //   categoryId: 2,
  //   stockCount: 5,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
  // {},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
