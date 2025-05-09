const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');

const app = express();
const accessControl = (_req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,OPTIONS,PUT,PATCH',
  );
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '100mb' }));
app.use(accessControl);
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/api/v1', routes);

module.exports = app;
