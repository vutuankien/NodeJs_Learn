const newsRouter = require('./news');

const aboutRouter = require('./about');

const siteRouter = require('./site');

const courseRouter = require('./courses')

function route(app) {
  app.use('/news', newsRouter);
  app.use('/about', aboutRouter);
  app.use('/courses', courseRouter);
  app.use('/', siteRouter);
}

module.exports = route;
