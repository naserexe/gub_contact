const { validationResult } = require('express-validator');
// can be reused by many routes

// parallel processing
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({success: false, msg: 'Invalid request body', errors: errors.mapped()});
  };
};

module.exports = validate;
