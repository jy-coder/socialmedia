const Post = require('../models/post')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const io = require('../socket')







exports.createPost = catchAsync(async (req,res,next) =>{
let error;

req.body.creator = req.user._id

if(!req.body.content)
  error = "Content must not be empty"


if(error)
  return res.status(400).json({
    error
});

const posts = await Post.create({
    content: req.body.content,
    creator : req.body.creator
    });  

    if(!posts)
        return next(new AppError('No document found with that ID', 404));
  
  let followersList = req.user.followers

        

  await Promise.all(followersList.map(async(follower) => {
    const oneUser = await Post.find({creator: follower.following }) //post is populated, find in creator following user list 
    await io.getIO().emit(`${follower._id}`,{action:`add`, posts:oneUser})

  }))

        
  res.status(200).json(posts); //the req.user who published
})


exports.getAPost = catchAsync(async (req,res,next) =>{
  const posts = await Post.findById(req.params.id)
  if(!posts)
    return next(new AppError('No document found with that ID', 404));

    res.status(200).json(posts);

})


exports.updatePost = catchAsync(async (req,res,next) =>{
let error;

if(!req.body.content)
  error = "Content must not be empty"

if(error)
  return res.status(400).json({
    error
});


  const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate('creator','name')

  if(!posts)
     return next(new AppError('No document found with that ID', 404));

     res.status(200).json(posts);
})



exports.deletePost = catchAsync(async (req,res,next) =>{
     const posts = await Post.findByIdAndDelete(req.params.id);
     if(!posts)
        return next(new AppError('No document found with that ID', 404));

        let followersList = req.user.followers
        let followerPosts
              
        //add to followers' feed & user own wall
        followersList.forEach(async (follower) => {
            followerPosts = await Post.find({creator: follower.following })
            if(followerPosts)
            io.getIO().emit(`${follower._id}`,{action:`delete`, postId: posts._id}) //listen in client
        });
              


        res.status(200).json(posts);
})


exports.likePost = catchAsync(async (req,res,next)=> {
      let posts = await Post.findByIdAndUpdate(req.body.postId, {$addToSet: {likes: req.user._id}}, {new: true})


      if(!posts)
      return next(new AppError('No document found with that ID', 404));

    
      res.status(200).json(posts);
})


exports.unlikePost = catchAsync(async (req,res,next)=> {
    let posts = await Post.findByIdAndUpdate(req.body.postId, 
                {$pull: {likes: req.user._id}}, {new: true})

    if(!posts)
    return next(new AppError('No document found with that ID', 404));

    res.status(200).json(posts);
})
  

exports.commentPost = catchAsync(async (req,res,next)=> {
    let comment = req.body.comment
    comment.postedBy = req.user._id
 
      let posts = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
    

        if(!posts)
            return next(new AppError('No document found with that ID', 404));


            io.getIO().emit(`${req.body.postId}`,{action:`updatepostcomment`, posts: posts}) //listen in client
    
            res.status(200).json(posts);
                              
    

  })


  exports.uncommentPost = catchAsync(async (req,res,next)=> {
    let comment = req.body.comment
    comment.postedBy = req.user._id
 
      let posts = await Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})


    
        if(!posts)
            return next(new AppError('No document found with that ID', 404));

        io.getIO().emit(`${req.body.postId}`,{action:`updatepostcomment`, posts: posts})
        res.status(200).json(posts);
                              
    

  })



  exports.myPost = catchAsync(async (req,res,next)=> {
    // console.log(req.user)
    const posts = await Post.find({creator: req.user._id}).sort({createdAt:-1})

     if(!posts)
         return next(new AppError('No document found with that ID', 404));
 
     res.status(200).json(posts);
})



  exports.otherUserPost = catchAsync(async (req,res,next)=> {
       const posts = await Post.find({creator: req.params.id })

        if(!posts)
            return next(new AppError('No document found with that ID', 404));
    
        res.status(200).json(posts);
  })

  

  exports.accessToAll = catchAsync(async (req,res,next)=> {
    const posts = await Post.find()

    if(!posts)
    return next(new AppError('No document found with that ID', 404))
   

    
      res.status(200).json(posts);
  })


  exports.getFeed = catchAsync(async (req,res,next)=> {
    const posts = await Post.find({creator: req.user.following}).sort({createdAt:-1})
    // const posts = await Post.find({creator: req.user.following}).sort({createdAt:-1})
   

    if(!posts)
      return next(new AppError('No document found with that ID', 404))
   


  

      // res.status(200).json(followerPosts);
      // io.getIO().emit({action:'add', chat:chat})
    
      res.status(200).json(posts);
  })

