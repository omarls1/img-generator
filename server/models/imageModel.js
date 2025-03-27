const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      set: function (val) {
        return val.trim().split(" ").join("-");
      },
    },
    title: {
      type: String,
      required: [true, "image title is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    prompt: {
      type: String,
      required: [true, "prompt is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ImageSchema.virtual("comments", {
  ref: "Comments",
  foreignField: "image",
  localField: "_id",
});

ImageSchema.virtual("likes", {
  ref: "Likes",
  foreignField: "image",
  localField: "_id",
});

ImageSchema.pre(/^find/, function (next) {
  this.populate("user").populate("comments").populate("likes");
  next();
});

ImageSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title.trim().split(" ").join("-");
  }
  next();
});

const Images = mongoose.model("Images", ImageSchema);
module.exports = Images;
