module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You must logged in first.");
    res.redirect("/login");
  },
};
