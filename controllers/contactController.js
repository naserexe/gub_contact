const cloudinary = require('cloudinary');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const asyncHandler = require('../middlewares/async');
const contactModel = require('../models/contactModel');
const shortCodeGenerator = require('../utils/nameShortCodeGenerator');

exports.createContact = asyncHandler(async (req, res, next) => {
  if(!req.user.isAdmin){
    return res.status(403).json({ success: false, message: 'You are not authorized to perform this operation'});
  }

  let photo;

  if(!req?.file?.filename){
    req.body.photo = 'https://res.cloudinary.com/nesh-soft/image/upload/v1670838375/Screenshot_2022-12-12_154602_xeiqy0.jpg'
  }else{
    const imageUpload = cloudinary.v2;

    imageUpload.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`./temp/pro-${req.file.filename}`);
  
    photo = await imageUpload.uploader.upload(`./temp/pro-${req.file.filename}`);
    if (!photo){
      throw new Error('Failed to save profile photo');
    }
    req.body.photo = photo.secure_url;

    fs.unlink(`./temp/${req.file.filename}`, (err) => {
      if (err) {
        console.error('Failed to clean temp file')
      }
    });

    fs.unlink(`./temp/pro-${req.file.filename}`, (err) => {
      if (err) {
        console.error('Failed to clean temp file')
      }
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPassword;

  // req.body.shortName = shortName = shortCodeGenerator(req.body.name);

  const newContact = await contactModel.create(req.body);

  res.status(201).json({ success: true, message: 'Contact created successfully', newContact });
});

exports.getAllContact = asyncHandler(async (req, res, next) => {

  const contacts = await contactModel.find({ isAdmin: false }).select('-password -isAdmin');

  res.status(200).json({ success: true, message: 'All contact fetched successfully', contacts });
});

exports.updateContact = asyncHandler(async (req, res, next) => {
  const isContactExists = await contactModel.findById(req.params.id);

  if(!isContactExists){
    throw new Error('No contact found')
  }

  if(!req.user.isAdmin && req.user._id.toString() !== isContactExists._id.toString()){
    return res.status(403).json({ success: false, message: 'You are not authorized to perform this operation'});
  }

  let photo;

  if(req?.file?.path){
    const imageUpload = cloudinary.v2;

    imageUpload.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`./temp/pro-${req.file.filename}`);

    photo = await imageUpload.uploader.upload(`./temp/pro-${req.file.filename}`);
    if (!photo){
      throw new Error('Failed to save profile photo');
    }

    req.body.photo = photo.secure_url;

    fs.unlink(`./temp/${req.file.filename}`, (err) => {
      if (err) {
        console.error('Failed to clean temp file')
      }
    });

    fs.unlink(`./temp/pro-${req.file.filename}`, (err) => {
      if (err) {
        console.error('Failed to clean temp file')
      }
    });
  }

  if(!req.user.isAdmin){
    delete req.body.email,
    delete req.body.designation,
    delete req.body.department,
    delete req.body.isAdmin,
    delete req.body.name
  }

  delete req.body.password;

  // req.body.shortName = shortName = shortCodeGenerator(req.body.name);

  const updatedContact = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password -isAdmin');

  res.status(200).json({ success: true, message: 'Contact updated successfully', updatedContact });
});


// get user
exports.deleteContact = asyncHandler(async (req, res) => {

  if(!req.user.isAdmin){
    return res.status(403).json({ success: false, message: 'You are not authorized to perform this operation'});
  }

  const deletedContact = await contactModel.findByIdAndDelete(req.params.id).select('-password');
  res.status(200).json({ success: true, message: 'Contact deleted successfully', deletedContact });
});