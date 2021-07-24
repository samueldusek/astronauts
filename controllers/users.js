const User = require("../models/user");

module.exports.showRegisterForm = (req, res) => {
  res.render("users/register", {
    pageTitle: "Register",
  });
};

module.exports.registerNewUser = async (req, res) => {
  const { username, email, password } = req.body.user;
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
  res.redirect("/");
};
