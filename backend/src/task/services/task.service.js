const TaskPersistence = require('../persistences/task.persistence');
const UserPersistence = require('../../user/persistences/user.persistence');

class TaskService {
  constructor() {
    this.taskPersistence = TaskPersistence;
    this.userPersistence = UserPersistence;
  }

  async list(filter = {}) {
    return this.taskPersistence.findAll(filter);
  }

  async getById(id) {
    const task = await this.taskPersistence.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };
    return task;
  }

  async create({ title, description, status, user_Id }) {
    if (!title) throw { status: 400, message: 'title is required' };
    if (!user_Id) throw { status: 400, message: 'user_Id is required' };

    const user = await this.userPersistence.findById(user_Id);
    if (!user) throw { status: 400, message: 'Invalid user_Id' };

    const now = new Date();
    const task = await this.taskPersistence.create({
      title,
      description: description || null,
      status: status || 'pending',
      user_Id,
      created_At: now,
      updated_At: now
    });

    return task;
  }

  async update(id, payload) {
    const task = await this.taskPersistence.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };

    if (payload.user_Id) {
      const user = await this.userPersistence.findById(payload.user_Id);
      if (!user) throw { status: 400, message: 'Invalid user_Id' };
    }

    payload.updated_At = new Date();
    const updated = await this.taskPersistence.update(task, payload);
    return updated;
  }

  async remove(id) {
    const task = await this.taskPersistence.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };
    await this.taskPersistence.delete(task);
  }
}

module.exports = TaskService;