const User = require("../models/user");
const { validationResult } = require("express-validator");

module.exports.showRegisterForm = (req, res) => {
  res.render("users/register", {
    pageTitle: "Register",
    errors: [],
    username: null,
    email: null,
  });
};

module.exports.registerNewUser = async (req, res) => {
  const { username, email, password } = req.body.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("users/register", {
      pageTitle: "Register",
      errors: errors.array().map((error) => {
        return { msg: error.msg, param: error.param };
      }),
      username: username,
      email: email,
    });
  }

  const user = new User({ email, username });
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, (error) => {
    if (error) return next(error);
    return res.redirect("/");
  });
};

module.exports.showLoginForm = (req, res) => {
  res.render("users/login", {
    pageTitle: "Login",
  });
};

module.exports.login = (req, res) => {
  console.log(req.body.user);
  res.redirect("/login");
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You have been successfully logged out.");
  res.redirect("/");
};
