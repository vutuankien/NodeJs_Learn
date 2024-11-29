const express = require('express');

var router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.post('/handle_form_actions', coursesController.handleFormActions);
router.get('/create', coursesController.create);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore); // Đặt trước
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.destroy);
router.post('/store', coursesController.store);
router.use('/:slug', coursesController.show); // Đặt sau cùng

module.exports = router;
