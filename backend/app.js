const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

app.use((req, res, next) => {
  res.send('Hello 2 from express!');
});
module.exports = app;
