const express = require('express');
const router = new express.Router();
const path = require('path');

const survey = name => path.resolve(__dirname + '/../views/surveys/' + name + '.html');

router.get('/career/*', ((req, res) => {
  res.sendFile(survey('career'))
}));

router.get('/school/*', ((req, res) => {
  res.sendFile(survey('school'))
}));

router.get('/*', ((req, res) => {
  res.sendFile(survey('general'))
}));

module.exports = router;
