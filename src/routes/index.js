const newsRouter = require('./news');

const aboutRouter = require('./about');

const siteRouter = require('./site');

const courseRouter = require('./courses');

const meRouter = require('./me'); // Add this line

function route(app) {
    app.use('/news', newsRouter);
    app.use('/about', aboutRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
