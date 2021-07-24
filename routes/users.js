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
      successRedirect: "/astronauts/all",
      failureRedirect: "/login",
      failureFlash: "Invalid username or password. Try it again please.",
      successFlash: "You have been successfully logged in.",
    })
  );

router.route("/logout").get(usersController.logout);

module.exports = router;
