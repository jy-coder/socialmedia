const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostPhoto = upload.single('photo');

exports.resizePostPhoto = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `product-${req.user._id}-${Date.now()}.jpeg`;
  filePath = path.join(__basedir ,`../client/public/${req.file.filename}`)
  await sharp(req.file.buffer)
    .resize(200 ,200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filePath);

  next();
});



exports.followUser = catchAsync(async (req,res,next)=> {
    let data = await User.findByIdAndUpdate(req.body.userId, {$addToSet: {followers: req.user._id}}, {new: true})

    if(!data)
    return next(new AppError('No document found with that ID', 404));

  
    next()
})


exports.unfollowUser = catchAsync(async (req,res,next)=> {
  let data = await User.findByIdAndUpdate(req.body.userId, {$pull: {followers: req.user._id}}, {new: true})

  if(!data)
  return next(new AppError('No document found with that ID', 404));

    next()
})


exports.addFollowing= catchAsync(async (req,res,next)=> {
    let data = await User.findByIdAndUpdate(req.user._id, {$addToSet: {following: req.body.userId}}, {new: true})

    if(!data)
    return next(new AppError('No document found with that ID', 404));

  
    res.status(200).json({
      status: `success`
      })
})


exports.removeFollowing= catchAsync(async (req,res,next)=> {
    let data = await User.findByIdAndUpdate(req.user._id, {$pull: {following: req.body.userId}}, {new: true})

    if(!data)
    return next(new AppError('No document found with that ID', 404));

  
    res.status(200).json({
      status: `success`
      })
})


exports.otherUser= catchAsync(async (req,res,next)=> {
  let user = await User.find({_id: req.params.id}).populate('following','name')
  if(!user)
    return next(new AppError('No document found with that ID', 404));


  res.status(200).json(user)
})