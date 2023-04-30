require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express();
const mysql = require('mysql');
const axios = require('axios');
const db = require('./connection.js');
const oneHour = 1000 * 60 * 60 * 1;
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;
const port = process.env.PORT || 3000;


app.use(cookieParser());
app.use(sessions({
  secret: "myshows14385899",
  saveUninitialized: true,
  cookie: { maxAge: oneHour },
  resave: false
})
);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/albums', (req, res) => {

  let sql = 'SELECT album.*, SUM(song.song_duration) AS total_duration FROM album JOIN song ON album.album_id = song.album_id GROUP BY album.album_id';

  db.query(sql, (err, rows) => {
    if (err) throw err;

    // Create array of album objects with data
    let albums = rows.map(row => ({
      id: row.album_id,
      name: row.album_name,
      img: row.album_art,
      year: row.album_year,
      totalDuration: row.total_duration
    }));

    // Render albums view with data
    res.render('albums', { albums });
  });
});

app.get("/album", (req, res) => {

  let album_id = req.query.album_id;

  let sql = "SELECT album.album_name, album.album_art, album.album_year, song.song_name, song.song_duration FROM album INNER JOIN song ON album.album_id = song.album_id WHERE album.album_id = ?";


  db.query(sql, [album_id], (err, rows) => {
    if (err) throw err;
    let album = {
      name: rows[0]['album_name'],
      img: rows[0]['album_art'],
      year: rows[0]['album_year'],
      songs: []
    };
    
    for (let i = 0; i < rows.length; i++) {
      let song = {
        name: rows[i]['song_name'],
        length: rows[i]['song_duration']
      };
      album.songs.push(song);
    }
    res.render('album', { album });
  });
});

app.get("/signup", (req, res) => {
  res.render('signup', {
    message: undefined
  });
});

app.post('/signup', (req, res) => {
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let useremail = req.body.emailField;
  let userpassword = req.body.passwordField;
  let confirmpassword = req.body.confirmPasswordField;

  db.query('SELECT email FROM user_details WHERE email = ?', [useremail], async (error, result) => {
    if (error) {
      console.log(error)
    }
    if (result.length > 0) {
      return res.render('signup', {
        message: 'This email is already in use'
      })
    } else if (userpassword !== confirmpassword) {
      return res.render('signup', {
        message: 'Passwords do not match!'
      })
    }

    let hashedPassword = await bcrypt.hash(userpassword, saltRounds)

    db.query('INSERT INTO user_details SET?', { firstname: firstname, lastname: lastname, email: useremail, password: hashedPassword }, (err, result) => {
      if (error) {
        console.log(error)
      } else {
        return res.render('signup', {
          message: 'User registered!'
        })
      }
    })
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post('/login', (req, res) => {
  let useremail = req.body.emailField;
  let userpassword = req.body.passwordField;

  let checkuser = 'SELECT * FROM user_details WHERE email = ? ';

  db.query(checkuser, [useremail], (err, rows) => {
    if (err) throw err;
    let numRows = rows.length;
    if (numRows > 0) {
      let hash = rows[0].password;
      bcrypt.compare(userpassword, hash, (err, result) => {
        if (result) {
          let sessionobj = req.session;
          sessionobj.authen = rows[0].user_id;
          res.redirect('/dashboard');
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword.ejs");
});

app.get('/dashboard', (req, res) => {
  let sessionobj = req.session;
  if (sessionobj.authen) {
    let uid = sessionobj.authen;
    let user = 'SELECT * FROM user_details WHERE user_id = ?';
    db.query(user, [uid], (err, row) => {
      if (err) throw err;
      let firstrow = row[0];
      res.render('dashboard', { userdata: firstrow });
    });

  } else {
    return res.render('login', {
      message: 'denied!'
    })
  }
});

app.get("/admin/addAlbum", (req, res) => {
  res.render("addalbum.ejs");
});

app.post("/admin/addAlbum", (req, res) => {

  let sentalbum = req.body.fieldAlbum;
  let sentyear = req.body.fieldYear;
  let sentartist = req.body.fieldArtist;
  let sentgenre = req.body.fieldGenre;
  let sentsubgenre = req.body.fieldSubgenre;
  let sentsubgenre2 = req.body.fieldSubgenre2;
  let sentrecordcompany = req.body.fieldRecordCompany;
  let sentalbumart = req.body.fieldAlbumArt;

  const showData = {
    album: sentalbum,
    year: sentyear,
    artist: sentartist,
    genre: sentgenre,
    subgenre: sentsubgenre,
    subgenre2: sentsubgenre2,
    recordCompany: sentrecordcompany,
    albumArt: sentalbumart,
  };

  axios.post(endp, showData, config).then((response) => {
    console.log(response.data);
    res.render('addalbum', { showData });
  }).catch((err) => {
    console.log(err.message);
  });
});

app.get("/admin/editalbum", (req, res) => {
  res.render("editalbum.ejs");
});



app.get('/myalbums', (req, res) => {
  //get at the session object and store it ina local variable
  let sess_obj = req.session;
  //check to see if the key favband exists. If not then set if with the
  //string 'not choosen yet'
  if (!sess_obj.favalbum) {
    sess_obj.favalbum = "not chosen yet";
  }
  //send the session object key favalbum to the band.ejs template
  res.render('myalbums', { data: sess_obj.favalbum });
});

app.post('/myalbums', (req, res) => {
  //get at the session object and store it ina local variable
  let sess_obj = req.session;
  //set the value from the text field equal to the session object key 'favband'
  sess_obj.favalbum = req.body.favourite;
  //send the session object key 'favalbum' to the band.ejs template
  res.render('myalbums', { data: sess_obj.favalbum });
});
app.listen(port, () => console.log(`listening on port ${port}...`));

