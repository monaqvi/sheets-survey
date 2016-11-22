const appRouter = require('./appRouter');
const path = require('path');

module.exports = (app, express) => {
  const redirectHome = (req, res) => {
    console.log(req.params);
    res.redirect('/');
  }

  app.use(express.static(__dirname + '/../../client'));

  app.use('/app', appRouter);

  app.get('/thankyou/', (req, res) => res.sendFile(path.resolve(__dirname + '/../views/thankyou.html')));

  app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname + '/../views/index.html')));
};
