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
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        // Log the body for debugging
        console.log(req.body);

        // Kiểm tra nếu tên khóa học bị thiếu
        if (!req.body.name) {
            console.log(req.body.name);
            return res.status(400).json({ error: 'Invalid course data' });
        }

        // Tạo mới một course instance
        const newCourse = new Course({
            name: req.body.name,
            description: req.body.description,
            image: `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`,
            videoId: req.body.videoId,
        });

        // Lưu course vào cơ sở dữ liệu
        newCourse
            .save()
            .then(() => res.redirect('/'))
            .catch(next); // Forward the error to error-handling middleware
    }
}

module.exports = new CoursesController();
