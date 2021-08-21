// models
const User = require("../models/User");
const passport = require("passport");

class UsersServices {
  // signup
  signUpForm(req, res) {
    res.render("users/signup");
  }
  async signup(req, res) {
    const errors = [];
    const { username, password, confirm_password } = req.body;

    if (password != confirm_password) {
      errors.push("Password does not match");
    }
    if (password.length < 8) {
      errors.push({ text: "Password must be at least 8 characters." });
    }

    if (errors.length > 0) {
      return res.render("users/signup", { errors, username });
    }

    const user = await User.findOne({ username });
    if (!user) {
      const userCreated = new User({
        username,
        password,
      });
      userCreated.password = await userCreated.encryptPassword(password);
      await userCreated.save();
      req.flash("success_msg", "Welcome to Notes-app!");
      res.redirect("/users/signin");
    }
  }

  // signin
  signInForm(req, res) {
    res.render("users/signin");
  }
  signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  });

  // logout
  async logOut(req, res) {
    req.logout();
    req.flash("success_msg", "Good bye, see you later");
    res.redirect("/users/signin");
  }
}

module.exports = UsersServices;
