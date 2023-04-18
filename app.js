const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static', 'index.html'));
});

app.listen(PORT, 
     () => console.log(`Server listening on port: ${PORT}`)
);

