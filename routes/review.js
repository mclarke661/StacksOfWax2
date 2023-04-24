const express = require('express');
const router = express.Router();

app.get("/:username?", (req, res) => {
    let s_name = req.params.username;
    res.send(`<h3>feedback comments on ${s_name}</h3>`);
  });

  modules.exports = router;