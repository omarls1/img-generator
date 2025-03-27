const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/logout", authController.protect, authController.logout);

router.route("/:id?").get(authController.isLoggedIn, userController.getUser);
router.use(authController.protect);

router.patch("/change-password", authController.changeMyPassword);
router
  .route("/")
  .patch(userController.updateMe)
  .delete(authController.deleteMe);

module.exports = router;
