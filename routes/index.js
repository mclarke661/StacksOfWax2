// const express = require('express');
// const router = express.Router();
const express = require('express');
let app = express();
// const basicAuth = require('express-basic-auth');

// app.get("/", (req, res) => { 
//     res.send(`<h1>conference</h1>
//             <p><a href='/speakers/Melissa'>Melissa Brownlee</a></p>
//             <p><a href='/speakers/John'>John Busch</a></p>`);
//   });

// //basic security
// const auth = basicAuth({
//     users: { 'admin': 'admin123' },
//     unauthorizedResponse: 'not authorized'});


// app.get('/protected', auth , (req, res) => {
// res.json({
//           data:"Welcome to my API",
//           message:"Not protected data",
//           auth:"header authorization"
//           });
// });


// app.get('/', (req, res) => {
//  res.json({
//           data:"Welcome to my API",
//           message:"Not protected data"
//           });
// });


// app.listen(4000, () =>{
// console.log('host 4000');
// });

// modules.exports = router;



//middleware to use the EJS template engine
app.set('view engine', 'ejs');

//middleware to be able POST <form> data 
app.use(express.urlencoded({extended: true}));

//store favourite band in a global variable
let favband = "not choosen yet";

app.get('/fav',  (req, res) => {
    res.render('band', {data: favband});
});

app.post('/fav',  (req, res) => {
    //change global variable favband to the value of the text field
    favband = req.body.favourite;
    res.render('band', {data: favband});
});

app.get('/page1',  (req, res) => {
    res.render('page1', {data: favband});
});

app.get('/page2',  (req, res) => {
    res.render('page2', {data: favband});
});

app.listen(process.env.PORT || 4000, ()=>{ 
    console.log("server started on: localhost:4000/fav");
});