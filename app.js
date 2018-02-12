require('dotenv').config()

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    aws         = require('aws-sdk'),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash")
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Workspace   = require("./models/workspace"),
    seedDB      = require("./seeds"),
    Review      = require("./models/review"),
    User        = require("./models/user")

// Requiring routes
var workspaceRoutes = require("./routes/workspaces"),
    reviewRoutes    = require("./routes/reviews"),
    indexRoutes     = require("./routes/index")

// var mLab = new aws.mLab({
//   username: process.env.MLAB_USER,
//   password: process.env.MLAB_PASSWORD
// })

// mongoose.connect("mongodb://localhost/swapper");
mongoose.connect(process.env.MLAB_URI);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());
// seedDB();

// ==== PASSPORT CONFIGURATION ====
app.use(require("express-session")({
  secret: "test secret for dev",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==== ROUTE PROTECTION ====
// Store currentUser on req.locals as local variable
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use("/", indexRoutes)
app.use("/workspaces", workspaceRoutes);
app.use("/workspaces/:id/reviews", reviewRoutes);

app.listen(3000, function(){
  console.log("Swapper has started...");
});
