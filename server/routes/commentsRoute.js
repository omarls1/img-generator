const express = require("express");
const commentsController = require("../controllers/commentsController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);
router.route("/").post(commentsController.createComment);

router
  .route("/:id")
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment);
module.exports = router;
