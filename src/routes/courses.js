const express = require('express');

var router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.get('/create', coursesController.create);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);
router.post('/store', coursesController.store);
router.use('/:slug', coursesController.show);

module.exports = router;
