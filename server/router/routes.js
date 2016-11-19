const appRouter = require('./appRouter');

module.exports = (app, express) => {
  const redirectHome = (req, res) => res.redirect('/');

  app.use(express.static(__dirname + '/../../client'));

  app.get('/', redirectHome);

  app.use('/app', appRouter);

  app.get('*', redirectHome);
};
