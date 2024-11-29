const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).lean().sortable(req),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([course, deletedCount]) => {
                res.render('Me/stored_course', {
                    course: course,
                    deletedCount: deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((course) => {
                if (!course) {
                    // Handle case where the course is not found
                    return res.status(404).send('Course not found');
                }
                // res.render('courses/show', { course });
                res.render('Me/trash_course', { course });
            })
            .catch(next); // Forward the error to error-handling middleware
    }
}

module.exports = new MeController();
