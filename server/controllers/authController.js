const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const validator = require('validator');
ObjectId = require('mongodb').ObjectID;


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    token,
    user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const { email,name, password, confirmPassword} = req.body;
  let errors=[]
  if(validator.isEmpty(email))
    errors.push("Email cannot be empty")
  if(validator.isEmpty(name))
      errors.push("Name cannot be empty")
  if(validator.isEmpty(password))
      errors.push("Password cannot be empty")
  if(validator.isEmpty(confirmPassword))
      errors.push("Confirm Password cannot be empty")
  if(!validator.equals(password,confirmPassword))
      errors.push("Passwords does not match")
  if(errors.length>0)
      return res.status(422).json({ errors });


  const existingUser = await User.findOne({email: req.body.email})
  if(existingUser){
    return next(new AppError('User already exist!', 400));
  }

  if(!existingUser){
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });
}
  
  res.status(200).json({msg: 'You have successfully signed up. You can log in to your account now'});
});

exports.login = catchAsync(async (req, res, next) => {
  let errors = [];
  const { email, password } = req.body;

  if(validator.isEmpty(email))
    errors.push("Email cannot be empty")
  if(validator.isEmpty(password))
    errors.push("Password cannot be empty")
  if(errors.length>0)
    return res.status(422).json({ errors });
    

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.auth = catchAsync(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id).populate('following' , 'name photo').populate('followers', 'name photo');
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  // req.user={_id: ObjectId('5ebbbd886954234550fe23f3')}
  // req.user={_id: ObjectId('5ebbcea54203de447054ced3')}
  // req.user={_id: ObjectId('5ebbd526fcf3204e50268835')}
  
  next();
});


exports.getUser = catchAsync(async (req,res,next) =>{
  const user = req.user;
  if(!user)
    return next(
      new AppError('Please login.', 401)
    );
  res.status(200).json(user);

})


exports.updateMe = catchAsync(async (req,res,next) =>{
  if(req.file)
    req.body.photo= req.file.filename

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({user:updatedUser});
})






