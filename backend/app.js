require('dotenv').config();
const cors = require('cors');
const express = require('express');
const loginRouter = require('./controllers/login');
const flowDataRouter = require('./controllers/flow-data');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login/', loginRouter);
app.use('/api/flow-data/', flowDataRouter);

app.get('/', (request, response) => {
  response.send('<h1>The Server is running!<h1>');
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
