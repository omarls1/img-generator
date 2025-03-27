const express = require("express");
const likesController = require("../controllers/likesController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(likesController.createLike)
  .get(likesController.getUserLikes)
  .delete(likesController.deleteLike);

module.exports = router;
