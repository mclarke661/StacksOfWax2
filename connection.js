let mysql  = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '40371893',
    port: '8889' 
});

db.connect((err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('database connected successfully');
  });

module.exports = db;
