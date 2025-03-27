const express = require("express");
const imagesController = require("../controllers/imagesController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", imagesController.getImages);

router
  .route("/:id")
  .patch(authController.protect, imagesController.updateImage)
  .delete(authController.protect, imagesController.deleteImage);

router.use(authController.protect);
router.route("/").post(imagesController.saveImage);
router.post("/generate-image", imagesController.createImage);

module.exports = router;
