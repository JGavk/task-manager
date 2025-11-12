const UserServiceModule = require('../user/services/user.service');
const TaskServiceModule = require('../task/services/task.service');

const UserService = typeof UserServiceModule === 'function' ? new UserServiceModule() : UserServiceModule;
const TaskService = typeof TaskServiceModule === 'function' ? new TaskServiceModule() : TaskServiceModule;

module.exports = {
  container: {
    api: {
      UserService,
      TaskService
    }
  }
};