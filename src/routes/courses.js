const express = require('express');

var router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.use('/:slug', coursesController.show);

module.exports = router;
