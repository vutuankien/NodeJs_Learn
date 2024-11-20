const News = require('../models/News');

class NewsController {
    // [GET] /news
    index(req, res) {
        News.find({})
            .lean()
            .then((news) => res.render('news', { news }))
            .catch((err) => next(err));
    }

    // [GET] /news/create
    create(req, res) {
        res.render('news/create');
    }

    // [GET] /news/:slug
    show(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .lean()
            .then((news) => {
                if (!news) {
                    return res.status(404).send('News not found');
                }
                res.render('news/show', { news });
            })
            .catch(next);
    }

    //[POST] /news/store
    store(req, res, next) {
        console.log(req.body);
        if (!req.body.title) {
            return res.status(400).json({ error: 'Invalid news data' });
        }

        const news = new News(req.body);
        news.save()
            .then(() => res.redirect('/news'))
            .catch((err) => next(err));
    }
}

module.exports = new NewsController();
