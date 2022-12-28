const router = require('express').Router();

const { body } = require('express-validator');
const { createContact, getAllContact, updateContact, deleteContact } = require('../controllers/contactController');
const validate = require('../middlewares/reqValidation');
const imageUploader = require('../utils/imageUpload')

const protect = require('../middlewares/auth');

router.route('/')
  .post(protect, imageUploader.single('photo'), validate([
    body('email').isEmail().withMessage('Email is required'),
    body('name').isString().withMessage('Name is required'),
    body('designation').isString().withMessage('Designation is required'),
    body('department').isString().withMessage('Department is required'),
    body('primaryPhone').isString().withMessage('Primary phone is required'),
    body('room').isString().withMessage('Room number is required'),
  ]), createContact)
  .get(getAllContact);

router.route('/update/:id')
.post(protect, imageUploader.single('photo'), updateContact);

router.route('/:id').delete(protect, deleteContact)

module.exports = router;