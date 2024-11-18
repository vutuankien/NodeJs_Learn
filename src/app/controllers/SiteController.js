const Course = require('../models/Course');

class SiteController {
  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  // [GET] /
  index(req, res) {
    Course.find({}).lean()
      .then(courses => {
        return res.render('home',{
          courses:courses
        }); 
      })
      .catch(err => next(err));
  }
}

module.exports = new SiteController();
