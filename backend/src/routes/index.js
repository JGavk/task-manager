const express = require('express');
const router = express.Router();

try {
  const tasksRouter = require('./tasks');
  router.use('/task', tasksRouter); 
} catch (err) {
  console.warn('routes/tasks.js not found. Create it or adjust routes/index.js');
}

const authRouter = require('./auth');
router.use('/', authRouter);

router.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = router;