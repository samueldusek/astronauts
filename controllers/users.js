const User = require("../models/user");

module.exports.showRegisterForm = (req, res) => {
  res.render("users/register", {
    pageTitle: "Register",
  });
};

module.exports.registerNewUser = (req, res) => {
  console.log(req.body.user);
  res.redirect("/register");
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
