const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images",
      required: true,
    },
  },
  { timestamps: true }
);
LikesSchema.index({ user: 1, image: 1 }, { unique: true });

const Likes = mongoose.model("Likes", LikesSchema);
module.exports = Likes;
