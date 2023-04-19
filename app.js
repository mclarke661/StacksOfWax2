const path = require('path');
const mysql = require('mysql');

const express = require("express");
const app = express();
const connection = require("./connection.js");

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at port 3000");
});

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static', '/index.html'));
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'stacks_of_wax',
  port: '8889' 
});

db.connect((err) => {
    if(err){
        return console.log(err.message);
    }
  console.log('database connected successfully');
});

module.exports = db;

app.get('/stacks_of_wax', (req, res) => {
  const sql = 'SELECT album_art FROM album';
  db.query(sql, (err, result) => {
    if (err) throw err;
    const albumArtUrls = result.map((row) => row.album_art);
    res.json(albumArtUrls);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

