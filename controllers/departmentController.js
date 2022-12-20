const asyncHandler = require('../middlewares/async');
const Department = require('../models/departmentModel');

exports.createDepartment = asyncHandler(async (req, res, next) => {

  const newContact = await Department.create(req.body);

  res.status(201).json({ success: true, message: 'Contact created successfully', newContact });
});

exports.getAllDepartment = asyncHandler(async (req, res, next) => {

  const departments = await Department.find();

  res.status(200).json({ success: true, message: 'All department fetched successfully', departments });
});