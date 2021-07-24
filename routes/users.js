const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const passport = require("passport");

router
  .route("/register")
  .get(usersController.showRegisterForm)
  .post(usersController.registerNewUser);

router
  .route("/login")
  .get(usersController.showLoginForm)
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

router.route("/logout").get(usersController.logout);

module.exports = router;
