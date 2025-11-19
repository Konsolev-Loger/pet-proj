const { User, Company } = require('../../db/models');

class UserService {
  static async getUserByEmail(email) {
    if (!email) return null;
    return (
      await User.findOne({
        where: { email },
        // include: [{ model: Company, as: 'Companies' }],
      })
    )?.get();
  }

  static async createUser(userData) {
    return (await User.create(userData))?.get();
  }

  static async getUserById(id) {
    return (
      await User.findByPk(id, {
        include: [{ model: Company }],
      })
    )?.get();
  }
}

module.exports = UserService;
