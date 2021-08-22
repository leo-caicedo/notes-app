const passport = require("passport");
const LocalStrategy = require("passport-local");

// models
const User = require("../users/models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async (username, password, done) => {
      // Match Email's User
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: "Invalidate credentials" });
      } else {
        // Match Password's User
        const match = await user.validatePassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalidate credentials" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
