const appRouter = require('./appRouter');
const surveyRouter = require('./surveyRouter');
const path = require('path');

module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));
  app.use('/', surveyRouter);
  app.use('/app', appRouter);

  app.get('/thankyou/', (req, res) => res.sendFile(path.resolve(__dirname + '/../views/thankyou.html')));
};
