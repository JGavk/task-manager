const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');
const { userRegister, userLogin } = require('../validators/schemas');


router.post('/register', validate(userRegister), userController.register);
router.post('/login', validate(userLogin), userController.login);

module.exports = router;