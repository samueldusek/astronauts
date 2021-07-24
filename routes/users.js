const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router
  .route("/register")
  .get(usersController.showRegisterForm)
  .post(usersController.registerNewUser);

router.route("/login").get(usersController.showLoginForm);

module.exports = router;
