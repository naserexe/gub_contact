const asyncHandler = require('../middlewares/async');
const contactModel = require('../models/contactModel');

exports.createContact = asyncHandler(async (req, res, next) => {
  // console.log(req.body);

  // console.log(req.file);

  const newContact = await contactModel.create(req.body);

  res.status(201).json({ success: true, message: 'Contact created successfully', newContact });
});

exports.getAllContact = asyncHandler(async (req, res, next) => {

  const contacts = await contactModel.find();

  res.status(200).json({ success: true, message: 'All contact fetched successfully', contacts });
});