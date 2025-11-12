const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validate = require('../middleware/validate.middleware');
const { taskCreate, taskUpdate } = require('../validators/schemas');

router.get('/', taskController.list);
router.get('/:id', taskController.getById);
router.post('/', validate(taskCreate), taskController.create); 
router.put('/:id', validate(taskUpdate), taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router;