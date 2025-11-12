const { app, port } = require('../app');
const db = require('./models');
require('dotenv').config();

(async () => {
  try {
    await db.sequelize.authenticate();
    // For development only. Use migrations in production.
    await db.sequelize.sync({ alter: true });
    console.log('DB connected and synced');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
})();