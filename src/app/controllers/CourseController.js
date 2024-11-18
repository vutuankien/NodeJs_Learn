const Course = require('../models/Course');

class CoursesController {
  // [GET] /courses/:slug
  show(req, res,next) {
    Course.findOne({slug: req.params.slug}).lean()
    .then(course => res.render('courses/show',{
      course: course
    }))
    .catch(err => next(err));
  }
}

module.exports = new CoursesController();
