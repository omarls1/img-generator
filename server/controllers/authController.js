const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("node:util");

const sendResponse = (res, statusCode, data, token, status = "success") => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // Ensure secure is true for SameSite=None
    path: "/",
    sameSite: "None", // Set SameSite to None for cross-site cookies
  });

  res.status(statusCode).json({
    status: "success",
    data,
    token,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create(req.body);

  const returnUser = { ...newUser.toObject(), password: undefined };
  const token = signToken(newUser._id);
  sendResponse(res, 201, returnUser, token);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!password) {
    return next(new AppError("please enter your password 😊", 401));
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("incorrect password or email 😉", 401));

  user.password = undefined;

  req.user = user;
  const token = signToken(user._id);

  sendResponse(res, 200, user, token);
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;

  if (!token) return next(new AppError("you are not logged in!", 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_CODE
  );

  const user = await userModel.findById(decoded.id);
  if (!user)
    return next(
      new AppError("the user belong thiss token does not longor existe", 401)
    );

  if (user.passwordChangedAfter(decoded.iat))
    return next(new AppError("password changed please login again", 401));

  req.user = user;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
  if (!token) {
    req.isLoggedIn = false;
    return next();
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_CODE
  );

  const user = await userModel.findById(decoded.id).select("+email");

  if (!user || user.passwordChangedAfter(decoded.iat)) {
    return next();
  }

  req.user = user;
  next();
});

exports.changeMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await userModel.findById(req.user._id).select("+password");
  if (!(await bcrypt.compare(currentPassword, user.password)))
    return next(new AppError("please validate your current password 😊", 401));

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = signToken(user._id);
  sendResponse(res, 200, null, token);
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  const user = await userModel.findById(req.user._id).select("+password");

  if (!user) return next(new AppError("no user to delete 😥", 404));

  if (!password || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("please verify your password 🤨", 401));

  user.active = false;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "None",
  });

  res.status(200).json({ status: "success" });
};
