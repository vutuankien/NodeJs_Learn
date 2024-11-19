const Course = require('../models/Course');

class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                if (!course) {
                    // Handle case where the course is not found
                    return res.status(404).send('Course not found');
                }
                res.render('courses/show', { course });
            })
            .catch(next); // Forward the error to error-handling middleware
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        // Log the body for debugging
        console.log(req.body);

        if (!req.body.name || !req.body.slug) {
            console.log(req.body.name, req.body.slug);
            return res.status(400).json({ error: 'Invalid course data' });
        }

        // Create a new course instance
        const newCourse = new Course({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            slug: req.body.slug,
            videoId: req.body.videoId,
        });

        newCourse.save();

        res.send('Successfully created new course');
    }
}

module.exports = new CoursesController();
