const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../middlewares/async');
const contactModel = require('../models/contactModel');

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(statusCode)
    .json({ success: true, token });
};

exports.login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  // Check for manager
  const user = await contactModel.findOne({ email }).select('+password');
  if (!user) {
    throw new Error(`No user found!`);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return sendTokenResponse(user, 200, res);
});

// get user
exports.getUser = asyncHandler(async (req, res) => {
  const user = await contactModel.findById(req.user._id).select('-password');
  res.status(200).json({ success: true, message: 'Fetched current user', user });
});

// Change password
exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const match = await bcrypt.compare(oldPassword, req.user.password);

  if (!match) {
    return res.status(400).json({ success: false, msg: 'Old password does not match' });
  }

  const hash = await bcrypt.hash(newPassword, 11);

  await contactModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { password: hash } },
  );
  return res.status(200).json({ success: true, msg: 'Password changed successfully' });
});