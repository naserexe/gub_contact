const router = require('express').Router();

const { body } = require('express-validator');
const { createDepartment, getAllDepartment, deleteDepartment, updateDepartment} = require('../controllers/departmentController');
const validate = require('../middlewares/reqValidation');
const imageUploader = require('../utils/imageUpload')

const protect = require('../middlewares/auth');

router.route('/')
  .post(protect, validate([
    body('name').isString().withMessage('Department name is required'),
  ]), createDepartment)
  .get(getAllDepartment)

  router.route('/:id').delete(deleteDepartment);
  router.route('/:id').put(updateDepartment);

module.exports = router;
