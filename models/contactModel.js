const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  shortName: String,
  primaryPhone: {
    type: String,
    unique: true,
    // required: true
  },
  secondaryPhone: {
    type: String,
    default: 'N/A'
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  pbx: {
    type: String,
    default: 'N/A'
  },
  room: {
    type: String,
    // required: true
  },
  details: {
    type: String,
    default: 'N/A'
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('contact', ContactSchema);
