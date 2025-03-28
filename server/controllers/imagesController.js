const ImagesModel = require("../models/imageModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/catchAsync");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_NAME,
  api_key: process.env.CLAUDINARY_API_KEY,
  api_secret: process.env.CLAUDINARY_API_SECRET,
});

const sendResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
};

exports.createImage = catchAsync(async (req, res, next) => {
  const { prompt } = req.body;
  const options = {
    method: "POST",
    headers: {
      "x-freepik-api-key": process.env.FREEPICK_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      guidance_scale: 1,
      image: { size: "square_1_1" },
      num_images: 1,
      prompt: prompt,
    }),
  };

  const response = await fetch(
    "https://api.freepik.com/v1/ai/text-to-image",
    options
  );
  const data = await response.json();

  sendResponse(res, 201, data.data[0].base64);
});

exports.saveImage = catchAsync(async (req, res, next) => {
  const data = { ...req.body, user: req.user };
  const base64Image = `data:image/png;base64,${data.image}`;
  const uploadResponse = await cloudinary.uploader.upload(base64Image, {
    folder: "ai-generated-images",
  });

  data.image = uploadResponse.secure_url;
  const image = await ImagesModel.create(data);

  sendResponse(res, 201, image);
});

exports.getImage = catchAsync(async (req, res, next) => {
  const image = await ImagesModel.findById(req.params.id);
  if (!image) return next(new AppError("no image with this id 😥", 404));
  sendResponse(res, 200, image);
});

exports.updateImage = catchAsync(async (req, res, next) => {
  const image = await ImagesModel.findOneAndUpdate(
    { user: req.user._id, _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!image) return next(new AppError("no image to update for you 😥", 404));

  sendResponse(res, 201, image);
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const image = await ImagesModel.findOneAndDelete({
    user: req.user._id,
    _id: req.params.id,
  });
  if (!image) return next(new AppError("no image to delete for you 😥", 400));

  sendResponse(res, 204, null);
});

exports.getImages = catchAsync(async (req, res, next) => {
  const { search, user, page = 1 } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { prompt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
    };
  }

  if (user) {
    query.user = user;
  }

  const limit = 6;
  const skip = (page - 1) * limit;

  const images = await ImagesModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  sendResponse(res, 200, images);
});
