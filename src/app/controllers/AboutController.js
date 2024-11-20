const Authors = require('../models/Author');

class AboutController {
    index(req, res) {
        Authors.find({})
            .lean()
            .then((author) => res.render('about', { author: author }))
            .catch((err) => next(err));
    }

    // [GET] /about/create
    create(req, res) {
        res.render('about/create');
    }

    show(req, res, next) {
        Authors.findOne({ slug: req.params.slug })
            .lean()
            .then((author) => {
                if (!author) {
                    return res.status(404).send('Author not found');
                }
                res.render('about/show', { author: author });
            })
            .catch(next);
    }

    store(req, res, next) {
        console.log(req.body);
        if (!req.body.name) {
            return res.status(400).json({ error: 'Invalid news data' });
        }
        const author = new Authors(req.body);

        author
            .save()
            .then(() => res.redirect('/about'))
            .catch((err) => next(err));
    }
}

module.exports = new AboutController();
