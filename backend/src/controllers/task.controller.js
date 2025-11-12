const{
    container: dependencyContainer
} = require('../dependency_injector/dependencyInjection');

const API = dependencyContainer.api;
exports.list = async (req, res) => {
  try {
    const filter = {};
    if (req.query.user_Id) filter.user_Id = req.query.user_Id;

    if (req.query.status) {
      const raw = String(req.query.status);
      filter.status = raw.includes(',') ? raw.split(',').map(s => s.trim()) : raw;
    }

    const tasks = await API.TaskService.list(filter);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to list tasks' });
  }
};

exports.getById = async (req, res) => {
  try {
    const task = await API.TaskService.getById(req.params.id);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to get task' });
  }
};

exports.create = async (req, res) => {
  try {
    const task = await API.TaskService.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to create task' });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await API.TaskService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to update task' });
  }
};

exports.remove = async (req, res) => {
  try {
    await API.TaskService.remove(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to delete task' });
  }
};