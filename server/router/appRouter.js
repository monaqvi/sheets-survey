const express = require('express');
const router = new express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  console.log(req);
  console.log(res);
  next();
});

router.get('/thankyou', (req, res) => {
  res.sendFile(__dirname + "/../../client/thankyou.html");
});

module.exports = router;
