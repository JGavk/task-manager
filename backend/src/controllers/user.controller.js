const{
    container: dependencyContainer
} = require('../dependency_injector/dependencyInjection');

const API = dependencyContainer.api;

exports.register = async (req, res) => {
  try {
    const user = await API.UserService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to register' });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await API.UserService.login(req.body); 
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Failed to login' });
  }
};