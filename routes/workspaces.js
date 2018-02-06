var express = require("express")
var router = express.Router()
var Workspace   = require("../models/workspace")
var Review   = require("../models/review")


// List all workspaces
router.get("/", function(req,res){
  Workspace.find({}, function(err, workspaces){
    if(err){
      console.log("error", err)
    } else {
      res.render("workspaces/index", {workspaces, currentUser: req.user});
    }
  })
});

// Create new workspace
router.post("/", function(req, res){
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description

  Workspace.create({
    name: name,
    image: image,
    description: description
  }, function(err, workspace){
    if(err){
      console.log("error", err)
    } else {
      console.log("\n workspace created:", workspace)
      res.redirect("/workspaces")
    }
  })
});

// New workspace form
router.get("/new", isLoggedIn, function(req, res){
  res.render("workspaces/new")
})

// Show workspace
router.get("/:id", function(req, res){
  var id = req.params.id

  Workspace.findById({_id: id}).
            populate("reviews").
            exec(function(err, workspace){
              console.log("outside foundWorkspace", workspace)
              if(err) {
                console.log("Err in Workspace FindById", err)
              } else {
                console.log("foundWorkspace", workspace)
                res.render("workspaces/show", {workspace})
              }
            })
})

// ==== CHECK IF USER IS LOGGED IN ====
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports = router