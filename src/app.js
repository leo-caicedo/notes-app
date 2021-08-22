const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const path = require("path");
require("./utils/passport");
// required routes
const notesRoutes = require("./notes/routes/notes.routes");
const usersRoutes = require("./users/routes/users.routes");

const createApp = () => {
  const app = express();

  // settings
  app.set("views", path.join(__dirname, "views"));
  app.engine(
    ".hbs",
    hbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

  // middleware
  app.use(morgan("dev"));
  app.use(methodOverride("_method"));
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: "test",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // global varibles
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
  });

  // routes
  app.use("/notes", notesRoutes);
  app.use("/users", usersRoutes);
  app.get("/", (req, res) => {
    res.redirect("/users/home");
  });

  // static files
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};

module.exports = createApp;
