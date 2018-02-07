var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Workspace   = require("./models/workspace"),
    seedDB      = require("./seeds"),
    Review      = require("./models/review"),
    User        = require("./models/user")

// Requiring routes
var workspaceRoutes = require("./routes/workspaces"),
    reviewRoutes    = require("./routes/reviews"),
    indexRoutes     = require("./routes/index")

mongoose.connect("mongodb://localhost/swapper");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");
seedDB();

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
  res.locals.currentUser = req.user
  next()
})

app.use("/", indexRoutes)
app.use("/workspaces", workspaceRoutes)
app.use("/workspaces/:id/reviews", reviewRoutes)

app.listen(3000, function(){
  console.log("Swapper has started...");
});
