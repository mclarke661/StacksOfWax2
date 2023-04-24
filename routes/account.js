const express = require('express');
const router = express.Router();

app.get("/:username?", (req, res) => {
    let s_name = req.params.username;
    res.send(`<h1>${s_name}</h1>`);
  });

  modules.exports = router;