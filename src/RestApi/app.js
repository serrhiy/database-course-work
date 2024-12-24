const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = require('./database');

const router = require('./router');

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Сторінка не знайдена' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Помилка на сервері' });
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
