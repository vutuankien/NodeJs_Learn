const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((course) => {
                if (!course) {
                    // Handle case where the course is not found
                    return res.status(404).send('Course not found');
                }
                // res.render('courses/show', { course });
                res.render('Me/stored_course', { course });
            })
            .catch(next); // Forward the error to error-handling middleware
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
