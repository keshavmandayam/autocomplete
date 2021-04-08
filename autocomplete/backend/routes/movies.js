const express = require('express');
const router = express.Router();
const { dataSource } = require('../db/db');

/* POST to query Movies Trie for autocomplete data */
router.post('/', function(req, res, next) {
  const text = req.body.text;
  const top5Films = dataSource.getWords(text, 5);
  res.send(top5Films);
});

module.exports = router;