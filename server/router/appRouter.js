const express = require('express');
const router = new express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.post('/save', (req, res) => {
  console.log(req.data);
  res.send('hi');
});

module.exports = router;
