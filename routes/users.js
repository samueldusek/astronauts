const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const passport = require("passport");
const User = require("../models/user");
const { body } = require("express-validator");

router
  .route("/register")
  .get(usersController.showRegisterForm)
  .post(
    body("user.email")
      .isEmail()
      .withMessage("Please enter email in valid format example@email.com")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "This email has already been taken. Please use different one."
            );
          }
        });
      }),
    body("user.username")
      .isAlphanumeric()
      .withMessage(
        "Only numbers and letters are allowed in username. Please user different one."
      )
      .custom((value) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "This username has already been taken. Please use different one."
            );
          }
        });
      }),
    body("user.password")
      .isLength({ min: 5 })
      .withMessage(
        "Your password it so short. Use at least 5 characters in your password."
      ),
    body("user.passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.user.password) {
        throw new Error("Passwords you entered are not the same. Try it again.");
      }
      return true;
    }),
    usersController.registerNewUser
  );

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
