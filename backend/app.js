const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

const routes = require('./src/routes/index');
app.use('/', routes);

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, port };