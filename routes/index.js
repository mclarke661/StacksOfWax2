// const express = require('express');
// const router = express.Router();
const app = require('express')();
const basicAuth = require('express-basic-auth');

// app.get("/", (req, res) => { 
//     res.send(`<h1>conference</h1>
//             <p><a href='/speakers/Melissa'>Melissa Brownlee</a></p>
//             <p><a href='/speakers/John'>John Busch</a></p>`);
//   });

//basic security
const auth = basicAuth({
    users: { 'admin': 'admin123' },
    unauthorizedResponse: 'not authorized'});


app.get('/protected', auth , (req, res) => {
res.json({
          data:"Welcome to my API",
          message:"Not protected data",
          auth:"header authorization"
          });
});


app.get('/', (req, res) => {
 res.json({
          data:"Welcome to my API",
          message:"Not protected data"
          });
});


app.listen(4000, () =>{
console.log('host 4000');
});

// modules.exports = router;