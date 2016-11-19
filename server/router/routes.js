var appRouter = require('./appRouter');

module.exports = function(app, express) {
  var redirectHome = function(req, res) {
    res.redirect('/');
  }

  app.use(express.static(__dirname + '/../../client'));

  app.get('/', redirectHome);

  app.use('/app', appRouter);

  app.get('*', redirectHome);
};
