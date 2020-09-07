const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const io = require('../utils/socket')



exports.followUser = catchAsync(async (req,res,next)=> {
    let user = await User.findByIdAndUpdate(req.body.userId, {$addToSet: {followers: req.user._id}}, {new: true})

    if(!user)
    return next(new AppError('No document found with that ID', 404));

    io.getIO().emit(`${req.body.userId}`,{action:`updatefollower`, user})

  
    next()
})


exports.unfollowUser = catchAsync(async (req,res,next)=> {
  let user = await User.findByIdAndUpdate(req.body.userId, {$pull: {followers: req.user._id}}, {new: true})

  if(!user)
  return next(new AppError('No document found with that ID', 404));


  io.getIO().emit(`${req.body.userId}`,{action:`updatefollower`, user})

    next()
})


exports.addFollowing= catchAsync(async (req,res,next)=> {
    let user = await User.findByIdAndUpdate(req.user._id, {$addToSet: {following: req.body.userId}}, {new: true})

    if(!user)
    return next(new AppError('No document found with that ID', 404));

  
    res.status(200).json(user)
})


exports.removeFollowing= catchAsync(async (req,res,next)=> {
    let user = await User.findByIdAndUpdate(req.user._id, {$pull: {following: req.body.userId}}, {new: true})

    if(!user)
    return next(new AppError('No document found with that ID', 404));

  
    res.status(200).json(user)
})


exports.otherUser= catchAsync(async (req,res,next)=> {
  let user = await User.find({_id: req.params.id}).populate('following').populate('followers')
  if(!user)
    return next(new AppError('No document found with that ID', 404));


  res.status(200).json(user)
})


exports.getAllUsers= catchAsync(async (req,res,next)=> {
  // console.log(req.user._id)
  let user = await User.find({ _id: { "$ne": req.user._id } },{_id:1,name:1})
  if(!user)
    return next(new AppError('No document found with that ID', 404));


  res.status(200).json(user)
})