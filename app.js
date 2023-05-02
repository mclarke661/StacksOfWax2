// require("dotenv").config();
const express = require("express");
// const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express();
const mysql = require('mysql');
const axios = require('axios');
const db = require('./connection.js');
const routes = require('./routes/');
const oneHour = 1000 * 60 * 60 * 1;
const bcrypt = require("bcrypt");
// const session = require("express-session");
const saltRounds = 10;

// const auth = basicAuth({
//   users: { 'admin': 'admin123' },
//   unauthorizedResponse: 'not authorized'});

// app.get('/protected', auth , (req, res) => {
// res.json({
//         data:"Welcome to my API",
//         message:"Not protected data",
//         auth:"header authorization"
//         });
// });

app.use(cookieParser());
app.use(sessions({
  secret: "myshows14385899",
  saveUninitialized: true,
  cookie: { maxAge: oneHour },
  resave: false
})
);
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PW,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit:10,
//   port:process.env.DB_PORT,
//   multipleStatements: true
// });

// db.getConnection((err)=>{
//   if(err) return console.log(err.message);
//   console.log("connected to local mysql db using .env properties");
// });

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/albums', (req, res) => {
  let searchAlbumsSQL = 'SELECT album.*, SUM(song.song_duration) AS total_duration FROM album JOIN song ON album.album_id = song.album_id GROUP BY album.album_id';

  let albums = [];
  let artists = [];

  db.query(searchAlbumsSQL, (err, rows) => {
    if (err) throw err;

    // Create array of album objects with data
    albums = rows.map(row => ({
      id: row.album_id,
      name: row.album_name,
      img: row.album_art,
      year: row.album_year,
      totalDuration: row.total_duration
    }));
    let searchArtistsSQL = 'SELECT * FROM artist';

    db.query(searchArtistsSQL, (err, rows) => {
      if (err) throw err;

      // Create array of album objects with data
      artists = rows.map(row => ({
        id: row.artist_id,
        name: row.artist_name
      }));
      // Render albums view with data
      res.render('albums', { albums, artists });
    });
  });


});

app.post('/albums', (req, res) => {
  let fieldSearch = req.body.fieldSearch;

  let sql = 'SELECT * FROM album LEFT JOIN artist ON album.artist_id = artist.artist_id WHERE album.album_name LIKE ? OR artist.artist_name LIKE ?';

  db.query(sql, [fieldSearch + '%', fieldSearch + '%'], (err, rows) => {
    if (err) throw err;

    // Create array of album objects with data
    let albums = rows.map(row => ({
      id: row.album_id,
      name: row.album_name,
      img: row.album_art,
      year: row.album_year,
      totalDuration: row.total_duration
    }));

    console.log(JSON.stringify(albums, null, 2));
    let searchArtistsSQL = 'SELECT * FROM artist';

    db.query(searchArtistsSQL, (err, rows) => {
      if (err) throw err;

      // Create array of album objects with data
      let artists = rows.map(row => ({
        id: row.artist_id,
        name: row.artist_name
      }));

      // Render albums view with data
      res.render('albums', { albums, artists });
    });
  });
});

app.get("/album", (req, res) => {
  let sess_obj = req.session;
  let user_id = sess_obj.authen;
  let album_id = req.query.album_id;

  let sql = "SELECT album.album_name, album.album_art, album.album_year, genre.genre_name, subgenre.genre_name AS subgenre_name, subgenre2.genre_name AS subgenre2_name,record_company.record_company_name,song.song_name, song.song_duration FROM album INNER JOIN song ON album.album_id = song.album_id INNER JOIN genre ON album.genre_id = genre.genre_id LEFT JOIN genre AS subgenre ON album.subgenre_id = subgenre.genre_id LEFT JOIN genre AS subgenre2 ON album.subgenre2_id = subgenre2.genre_id INNER JOIN record_company ON album.record_company_id = record_company.record_company_id WHERE album.album_id = ?";

  let checkAddedSql = "SELECT COUNT(*) AS addedCount FROM user_album_favourites WHERE user_id = ? AND album_id = ?";

  let hasUserLiked = false;

  db.query(checkAddedSql, [user_id, album_id], (checkAddedErr, checkAddedRows) => {
    if (checkAddedErr) throw checkAddedErr;
    let hasUserAdded = (checkAddedRows[0]['addedCount'] > 0);

    hasUserLiked = hasUserAdded;

  });

  db.query(sql, [album_id], (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      let album = {
        id: album_id,
        name: rows[0]['album_name'],
        img: rows[0]['album_art'],
        year: rows[0]['album_year'],
        genre: rows[0]['genre_name'],
        subgenre: rows[0]['subgenre_name'],
        subgenre2: rows[0]['subgenre2_name'],
        recordCompany: rows[0]['record_company_name'],
        songs: []
      };

      for (let i = 0; i < rows.length; i++) {
        let song = {
          name: rows[i]['song_name'],
          length: rows[i]['song_duration']
        };
        album.songs.push(song);
      }
      res.render('album', { album, hasUserLiked });
    } else {
      res.status(404).send('Album not found');
    }
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

app.post("/admin/addAlbum", async (req, res) => {
  db.query("SELECT artist_id FROM artist WHERE artist_name = ?", [fieldArtist], (err, artistRows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error");
      return res.render('admin/addalbum', {
        message: 'invalid entry'
      });
    }

    if (artistRows.length > 0) {
      artist_id = artistRows[0].artist_id;
      checkAndInsertGenre();
    } else {
      db.query("INSERT INTO artist (artist_name) VALUES (?)", [fieldArtist], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error");
          return res.render('admin/addalbum', {
            message: 'invalid entry'
          });
        }
        artist_id = result.insertId;
        checkAndInsertGenre();
      });
    }
  });

  function checkAndInsertGenre() {
    let genre_id = null;
    db.query("SELECT genre_id FROM genre WHERE genre_name = ?", [fieldGenre], (err, genreRows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
        return res.render('admin/addalbum', {
          message: 'invalid entry'
        });
      }

      if (genreRows.length > 0) {
        genre_id = genreRows[0].genre_id;
        checkAndInsertSubgenre();
      } else {
        db.query("INSERT INTO genre (genre_name) VALUES (?)", [fieldGenre], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error");
            return res.render('admin/addalbum', {
              message: 'invalid entry'
            });
          }
          genre_id = result.insertId;
          checkAndInsertSubgenre();
        });
      }
    });
  }

  function checkAndInsertSubgenre() {
    let subgenre_id = null;
    db.query("SELECT genre_id FROM genre WHERE genre_name = ?", [fieldSubgenre], (err, subgenreRows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
        return res.render('admin/addalbum', {
          message: 'invalid entry'
        });
      }

      if (subgenreRows.length > 0) {
        subgenre_id = subgenreRows[0].subgenre_id;
        checkAndInsertSubgenre2();
      } else {
        db.query("INSERT INTO genre (genre_name) VALUES (?)", [fieldSubgenre], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error");
            return res.render('admin/addalbum', {
              message: 'invalid entry'
            });
          }
          subgenre_id = result.insertId;
          checkAndInsertSubgenre2();
        });
      }
    });
  }
  function checkAndInsertSubgenre2() {
    let subgenre2_id = null;
    db.query("SELECT genre_id FROM genre WHERE genre_name = ?", [fieldSubgenre2], (err, subgenre2Rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
        return res.render('admin/addalbum', {
          message: 'invalid entry'
        });
      }

      if (subgenreRows.length > 0) {
        subgenre2_id = subgenre2Rows[0].subgenre2_id;
        checkAndInsertRecordCompany();
      } else {
        db.query("INSERT INTO genre (genre_name) VALUES (?)", [fieldSubgenre2], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error");
            return res.render('admin/addalbum', {
              message: 'invalid entry'
            });
          }
          subgenre2_id = result.insertId;
          checkAndInsertRecordCompany();
        });
      }
    });
  }
  function checkAndInsertRecordCompany() {
    let record_company_id = null;
    db.query("SELECT record_company_id FROM record_company WHERE record_company_name = ?", [fieldRecordCompany], (err,) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
        return res.render('admin/addalbum', {
          message: 'invalid entry'
        });
      }

      if (recordCompanyRows.length > 0) {
        record_company_id = recordCompanyRows[0].record_company_id;
        insertResult();
      } else {
        db.query("INSERT INTO record_company (record_company_name) VALUES (?)", [fieldRecordCompany], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error");
            return res.render('admin/addalbum', {
              message: 'invalid entry'
            });
          }
          record_company_id = result.insertId;
          insertResult();
        });
      }
    });
  }

  function insertResult() {
    const [insertResult] = db.query("INSERT INTO album (album_name, album_year, artist_id, genre_id, subgenre_id, subgenre2_id, record_company_id, album_art) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [fieldAlbum, fieldYear, artist_id, genre_id, subgenre_id, subgenre2_id, record_company_id, fieldAlbumArt]);
    const album_id = insertResult.insertId;
    return res.redirect('/album?album_id=${album_id}')
  }

});

app.get("/admin/editalbum", (req, res) => {
  res.render("editalbum.ejs");
});

app.get('/myalbums', (req, res) => {
  //get at the session object and store it ina local variable
  let sess_obj = req.session;
  //check to see if the userid exists. If not then set if with the
  //string 'error'
  if (!sess_obj.authen) {
    res.redirect('/login');
  }
  let userid = req.session.authen;

  let searchAlbumFavouritesSQL = 'SELECT favs.*, album.*, SUM(song.song_duration) AS total_duration FROM user_album_favourites AS favs LEFT JOIN album ON album.album_id = favs.album_id JOIN song ON album.album_id = song.album_id WHERE favs.user_id = ? GROUP BY album.album_id, favs.user_id';
  // let searchSQL = 'SELECT album.*, SUM(song.song_duration) AS total_duration FROM album JOIN song ON album.album_id = song.album_id GROUP BY album.album_id';

  let albums = [];
  let artists = [];

  db.query(searchAlbumFavouritesSQL, [userid], (err, rows) => {
    if (err) throw err;

    // Create array of album objects with data
    albums = rows.map(row => ({
      id: row.album_id,
      name: row.album_name,
      img: row.album_art,
      year: row.album_year,
      totalDuration: row.total_duration
    }));
    let searchArtistsSQL = 'SELECT * FROM artist';

    db.query(searchArtistsSQL, (err, rows) => {
      if (err) throw err;

      // Create array of album objects with data
      artists = rows.map(row => ({
        id: row.artist_id,
        name: row.artist_name
      }));

      //send the session object key favalbum to the band.ejs template
      res.render('myalbums', { data: sess_obj.authen, albums, artists });
    });
  });
});

app.post('/addalbums/favourite', (req, res) => {
  let album_id = req.body.album_id;
  //get at the session object and store it ina local variable
  let sess_obj = req.session;
  //check to see if the userid exists. If not then set if with the
  //string 'error'
  if (!sess_obj.authen) {
    res.redirect('/login');
  }
  let user_id = req.session.authen;

  db.query('INSERT INTO user_album_favourites SET ?', { album_id, user_id }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/myalbums')
    }
  })

});

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});