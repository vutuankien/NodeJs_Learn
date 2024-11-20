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

    // [GET] /courses/:slug/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render('courses/edit', { course }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .lean()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CoursesController();
