const path = require('path');
const express = require("express");
const app = express();
const mysql = require('mysql');
const db = require("./connection.js");
const axios = require('axios');

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword.ejs");
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

