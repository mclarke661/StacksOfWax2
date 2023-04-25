const path = require('path');
// require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');
const db = require("./connection.js");
const axios = require('axios');

// const routes = require('./routes/')

app.use(express.static('static'));
const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get('/sign', (request, response) => {
  console.log(request.body.emailField);
  response.render('forms');
  });
  
  app.post('/sign', (request, response) => {
    response.render('forms');
  });

app.get("/row", (req, res) => {
  let showid = req.query.album_id;
  let readsql = "SELECT * FROM album WHERE id = ? ";

  connection.query(readsql, [album_id], (err, rows) => {
    if (err) throw err;
    let album = {
      name: rows[0]['album_name'],
      imgp: rows[0]['album_art'],
      year: rows[0]['album_year'],
    }
    res.render('album', { album });
  });
});

app.post("/create", (req, res) => {

  let senttitle = req.body.fieldTitle;
  let sentimg = req.body.fieldImg;
  let sentdes = req.body.fieldDescr;

  const showData = {
    title: senttitle,
    img: sentimg,
    description: sentdes,
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  let epoint = "http://jbusch.webhosting2.eeecs.qub.ac.uk/tvapi/?create&apikey=***";

  axios.post(epoint, showData, config).then((response) => {
    console.log(response.data);
    res.render('add', { showData });
  }).catch((err) => {
    console.log(err.message);
  });
});

app.get("/select", (req, res) => {
  let readsql = "SELECT * FROM album";
  connection.query(readsql, (err, rows) => {
    if (err) throw err;
    let rowdata = rows;
    res.render('albums', { title: 'List of albums', rowdata });
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
// app.use('/', routes);
// app.use('/account', userRoute);
// app.use('/review', reviewRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port 3000");
});

