const usersModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const sendResponse = (res, statusCodde, data, status = "success") => {
  return res.status(201).json({
    status: "success",
    data,
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  if (req.user && (req.user._id == req.params.id || !req.params.id))
    return sendResponse(res, 201, req.user);
  const user = await usersModel.findById(req.params.id);
  if (!user) return next(new AppError("please login verify your id 😥", 404));
  sendResponse(res, 200, user);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError("this route is not for updating password 🤦‍♂️", 401)
    );

  if (!req.user) return next(new AppError("User not authenticated", 401));

  const user = await usersModel.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) return next(new AppError("no user with this id 😥", 404));

  sendResponse(res, 201, user);
});
