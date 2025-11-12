const {Task} = require('../../models');

class TaskPersistence {
      async findAll(filter = {}) {
    return Task.findAll({ where: filter });
  }

  async findById(id) {
    return Task.findByPk(id);
  }

  async create(data) {
    return Task.create(data);
  }

  async update(taskInstance, data) {
    return taskInstance.update(data);
  }

  async delete(taskInstance) {
    return taskInstance.destroy();
  }
}

module.exports = new TaskPersistence();