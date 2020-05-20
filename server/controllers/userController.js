const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')

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