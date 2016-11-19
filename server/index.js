var express = require('express');
var bodyParser = require('body-parser');

var router = require('./router/routes');
var port = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app, express);

app.listen(port, err => {
  if (err) {
    console.log('Listen error: ', err);
    return err;
  }
  console.log('Survey listening on port ' + port + '!');
});
