const Joi = require('joi');

const userRegister = Joi.object({
  name: Joi.string().max(100).allow(null, ''),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const taskCreate = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().allow(null, ''),
  status: Joi.string().valid('pending','in_progress','done').default('pending'),
  user_Id: Joi.number().integer().positive().required()
});

const taskUpdate = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string().allow(null, ''),
  status: Joi.string().valid('pending','in_progress','done'),
  user_Id: Joi.number().integer().positive()
}).min(1);

module.exports = { userRegister, userLogin, taskCreate, taskUpdate };