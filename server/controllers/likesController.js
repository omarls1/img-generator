const LikeModel = require("../models/LikeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const sendResponse = (res, statusCode, data, status = "success") => {
  return res.status(statusCode).json({
    status: "sucess",
    data,
  });
};
exports.createLike = catchAsync(async (req, res, next) => {
  const data = { image: req.body.image, user: req.user };
  const like = await LikeModel.create(data);

  sendResponse(res, 201, like);
});

exports.getUserLikes = catchAsync(async (req, res, next) => {
  const likes = await LikeModel.find({ user: req.user.id })
    .select("image")
    .populate("image");

  if (!likes) return next(new AppError("no likes with this user id 😥", 404));
  sendResponse(res, 201, likes);
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const likes = await LikeModel.findOneAndDelete({
    user: req.user._id,
    image: req.body.image,
  });

  if (!likes) return next(new AppError("no like for delete 😥", 400));

  res.send("deleted")
});
