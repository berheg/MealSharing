const express = require('express');
const app = express;
const router = express.Router();
const path = require('path');
//path.join(__dirname, dist);
//router for rendering html
router.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, dist),'index.html');
  });
module.exports = router;
