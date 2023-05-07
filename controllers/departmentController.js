const asyncHandler = require('../middlewares/async');
const Department = require('../models/departmentModel');

exports.createDepartment = asyncHandler(async (req, res, next) => {

  const department= await Department.create(req.body);

  res.status(200).json({ success: true, message: 'Department created successfully', department  });
});

exports.getAllDepartment = asyncHandler(async (req, res, next) => {

  const departments = await Department.find();

  res.status(200).json({ success: true, message: 'All department fetched successfully', departments });
});

// Delete department
exports.deleteDepartment = asyncHandler(async (req, res, next) => {

  const deletedDepartment = await Department.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: 'Department deleted successfully', deletedDepartment  });
});


// Update department
exports.updateDepartment = asyncHandler(async (req, res, next) => {

  const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ success: true, message: 'Department deleted successfully', updatedDepartment  });
});
