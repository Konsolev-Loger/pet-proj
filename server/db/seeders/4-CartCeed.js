const cart = [
  {
    userId: 1,
    productId: 1,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    productId: 1,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    productId: 2,
    quantity: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    productId: 2,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    productId: 2,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Carts', cart);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
