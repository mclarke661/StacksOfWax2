const path = require('path');
const mysql = require('mysql');

const express = require("express");
const app = express();
const connection = require("./connection.js");

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

app.get("/select",(req,res) => {
  let readsql = "SELECT * FROM tv_shows";
  connection.query(readsql,(err, rows)=>{
      if(err) throw err;
      let stringdata = JSON.stringify(rows);
      res.send(`<h2>My TV</h2><code> ${stringdata}</code>`);
  });
});

app.get("/row",(req,res) => {
  let readsql = "SELECT * FROM tv_shows";
  connection.query(readsql,(err, rows)=>{
      if(err) throw err;
      res.send(`<h2>My TV</h2><code>${rows[1].showname}</code><img src='${rows[1].imgpath}'>`);
  });
});

app.get('/album_art', (req, res) => {
  const sql = 'SELECT album_art FROM album';
  db.query(sql, (err, result) => {
    if (err) throw err;
    const albumArtUrls = result.map((row) => row.album_art);
    res.json(albumArtUrls);
  });
});

app.listen(process.env.PORT || 3000, () => { 
  console.log("Server is running at port 3000"); 
});

