const newsRouter = require('./news');

const aboutRouter = require('./about');

const siteRouter = require('./site');

function route(app) {
              app.use('/news', newsRouter);
  app.use('/about', aboutRouter);
                   // app.use('/search',siteRouter)
  app.use('/', siteRouter);
}

module.exports = route;
