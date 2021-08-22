const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "Required sign in");
    return res.redirect("/users/signin");
  }
  next();
};

module.exports = auth;
