const router = require('express').Router();

const { body } = require('express-validator');
const validate = require('../middlewares/reqValidation');
const { login, getUser, changePassword } = require('../controllers/authController');
const protect = require('../middlewares/auth');

router.route('/login')
  .post(validate([
    body('email').isString().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
  ]), login);

router.route('/change-password')
  .post(validate([
    body('oldPassword').isString().withMessage('Old password is required'),
    body('newPassword').isString().withMessage('New password is required'),
  ]),protect, changePassword);

router.route('/me').get(protect, getUser);

module.exports = router;
