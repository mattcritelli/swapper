var express     = require("express")
    router      = express.Router()
    passport    = require("passport"),
    User        = require("../models/user")

// Root route
router.get("/", function(req, res){
  res.render("landing")
});

// Register routes
router.get("/register", function(req, res){
  res.render("register")
})

router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username})
  User.register(newUser,
  req.body.password,
  function(err, user){
    if(err){
      return res.render("register", {"error": err.message})
    } else {
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to Swapper " + user.username)
        res.redirect("/workspaces")
      })
    }
  })
})

// Login/Logout routes
router.get("/login", function(req, res){
  res.render("login")
})

router.post("/login",
  passport.authenticate("local", {
    successRedirect: '/workspaces',
    failureRedirect: '/login'
  }),
  function(req, res){
})

router.get("/logout", function(req, res){
  req.logout()
  req.flash("success", "You have been successfully logged out.")
  res.redirect("/")
})

// ==== CHECK IF USER IS LOGGED IN ====
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports = router
