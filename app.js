const path = require('path');
const mysql = require('mysql');

const express = require("express");
const app = express();
const connection = require("./connection.js");
const axios = require('axios');
const routes = require('./routes/')

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.get("/", (req, res) => { 
  res.send(`<h1>conference</h1>
          <p><a href='/speakers/Melissa'>Melissa Brownlee</a></p>
          <p><a href='/speakers/John'>John Busch</a></p>`);
});

app.get("/account/:username?", (req, res) => { 
  let s_name = req.params.username;
  res.send(`<h1>${s_name}</h1>`);
});

app.get("/review/:suername", (req, res) => { 
  let s_name = req.params.username;
  res.send(`<h3>feedback comments on ${s_name}</h3>`);
});

app.get("/row",(req,res) => {
  let showid = req.query.album_id;
  let readsql = "SELECT * FROM album WHERE id = ? ";

  connection.query(readsql,[album_id],(err, rows)=>{
      if(err) throw err;
      let album = {
          name: rows[0]['album_name'],
          imgp: rows[0]['album_art'],
          year: rows[0]['album_year'],
      }     
      res.render('album',{album});
  });
});

app.get('/admin/add', (req, res) => {
  res.render("addalbum");
});

app.get("/select",(req,res) => {
  let readsql = "SELECT * FROM album";
  connection.query(readsql,(err, rows)=>{
      if(err) throw err;
      let rowdata = rows;
      res.render('albums',{title: 'List of albums', rowdata});
  });
});

// Express route handler with URL: '/products' and a handler function 
app.get('/products', (request, response) => {
  // Make the GET call by passing a config object to the instance  
       axios.get('https://fakestoreapi.com/products?limit=5').then(apiResponse => { 
             // process the response  
             const products = apiResponse.data; 
             response.json(products); 
       });
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

/*app.get("/select",(req,res) => {
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
*/

app.get('/album_art', (req, res) => {
  const sql = 'SELECT album_art FROM album';
  db.query(sql, (err, result) => {
    if (err) throw err;
    const albumArtUrls = result.map((row) => row.album_art);
    res.json(albumArtUrls);
  });
});

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    event.target.form.submit();
  }
}



app.listen(process.env.PORT || 3000, () => { 
  console.log("Server is running at port 3000"); 
});

