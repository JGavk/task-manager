const { User } = require('../../models');

class UserPersistence {
  async findById(id) {
    return User.findByPk(id);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async create(data) {
    return User.create(data);
  }
}

module.exports = new UserPersistence();