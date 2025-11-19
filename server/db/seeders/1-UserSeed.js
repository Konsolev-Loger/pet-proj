const users = [
  {
    fullName: 'Jojo Betoni',
    email: 'john.doe@example.com',
    password: 'password1',
    phone: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: 'John Pesto',
    email: 'jane.smith@example.com',
    password: 'password2',
    phone: '0987654321',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
