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
        console.log(req.body);
        if (!req.body.name) {
            console.log(req.body.name);
            return res.status(400).json({ error: 'Invalid course data' });
        }
        const newCourse = new Course({
            name: req.body.name,
            description: req.body.description,
            image: `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`,
            videoId: req.body.videoId,
            level: req.body.level,
        });
        newCourse
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
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
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id }) // Lấy `id` từ params
            .then(() => {
                console.log(
                    `Course with ID ${req.params.id} restored successfully`,
                );
                res.redirect('back');
            })
            .catch((err) => {
                console.error('Error restoring course:', err);
                next(err);
            });
    }

    //[DELETE] /courses/:id/force
    destroy(req, res, next) {
        Course.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle_form_actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.status(400).json({ message: 'Action is not allowed' });
        }
    }
}

module.exports = new CoursesController();
