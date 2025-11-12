const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static UI from public (create public/index.html)
app.use(express.static('public'));

// mount your API routes at root so register becomes /register
const routes = require('./src/routes/index');
app.use('/', routes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, port };