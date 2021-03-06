require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/astronauts-db";
const port = process.env.PORT || 3000;

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl: dbUrl,
      dbName: "astronauts-db",
    }),
  })
);

app.use(flash());

const User = require("./models/user");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const astronautsRoutes = require("./routes/astronauts");
const usersRoutes = require("./routes/users");

app.use("/astronauts", astronautsRoutes);
app.use("/", usersRoutes);
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("mains/404", {
    pageTitle: "Ow no! This does not exist.",
    path: "/mains/404",
  });
});

app.get("/", (req, res) => {
  res.render("mains/home", {
    pageTitle: "Astronauts",
    path: "/mains/home",
  });
});

app.get("/*", (req, res) => {
  res.status(404).render("mains/404", {
    pageTitle: "Oh no! You lost!",
    path: "/mains/404",
  });
});

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
