const router = require('express').Router();

const { body } = require('express-validator');
const { createDepartment, getAllDepartment} = require('../controllers/departmentController');
const validate = require('../middlewares/reqValidation');
const imageUploader = require('../utils/imageUpload')

// const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post([
    body('name').isString().withMessage('Department name is required'),
  ], createDepartment)
  .get(getAllDepartment);

module.exports = router;
