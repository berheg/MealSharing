const express = require('express');
const app = express;
const router = express.Router();
//router for rendering html
router.get('/',function(req,res) {
    res.sendFile('index.html');
  });
module.exports = router;
