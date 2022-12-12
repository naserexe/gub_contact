const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  photo: String,
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  primaryPhone: {
    type: String,
    required: true
  },
  secondaryPhone: String,
  email: {
    type: String,
    required: true
  },
  pbx: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('contact', ContactSchema);
