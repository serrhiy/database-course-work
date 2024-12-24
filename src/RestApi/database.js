const mysql2 = require('mysql2');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cgik2wsxdoubl2D',
  database: 'mcanalyzer',
  insecureAuth: true
});

db.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних: ' + err.stack);
    return;
  }
  console.log('Підключено до бази даних з id ' + db.threadId);
});

module.exports = db;
