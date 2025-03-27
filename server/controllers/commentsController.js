const CommentModel = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const sendResponse = (res, statusCodde, data, status = "success") => {
  return res.status(201).json({
    status: "success",
    data,
  });
};

exports.createComment = catchAsync(async (req, res, next) => {
  const data = { ...req.body, user: req.user._id };
  const comment = await CommentModel.create(data);

  sendResponse(res, 201, comment);
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const commentUser = await CommentModel.findById(req.params.id).select("user");

  if (commentUser.user.toString() !== req.user._id.toString())
    return next(new AppError("this is not your comment 🤨", 401));

  const updatedComment = await CommentModel.findOneAndUpdate(
    { user: req.user._id, _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedComment)
    return next(new AppError("No comment found to update 😥", 400));

  sendResponse(res, 200, updatedComment);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const commentUser = await CommentModel.findById(req.params.id).select("user");

  if (commentUser.user.toString() !== req.user._id.toString())
    return next(new AppError("this is not your comment 🤨", 401));

  const Comment = await CommentModel.findOneAndDelete(req.params.id);

  if (!Comment) return next(new AppError("no comment for delete 😥", 400));

  sendResponse(res, 201, null);
});
