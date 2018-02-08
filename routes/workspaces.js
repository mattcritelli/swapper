var express     = require("express")
var router      = express.Router()
var Workspace   = require("../models/workspace")
var Review      = require("../models/review")
var middleware  = require("../middleware")


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
router.post("/", middleware.isLoggedIn, function(req, res){
  var user = {
    id: req.user._id,
    username: req.user.username
  }

  Workspace.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    user: user
  }, function(err, workspace){
    if(err){
      console.log("error", err)
    } else {
      res.redirect("/workspaces")
    }
  })
});

// New workspace form
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("workspaces/new")
})

// Show workspace
router.get("/:id", function(req, res){
  Workspace.findById(req.params.id).
            populate("reviews").
            exec(function(err, workspace){
              if(err) {
                console.log("Err in Workspace FindById", err)
              } else {
                res.render("workspaces/show", {workspace})
              }
            })
})

// Show workspace edit form, error is handled in middleware
router.get("/:id/edit", middleware.confirmWorkspaceOwner, function(req, res){
  Workspace.findById(req.params.id, function(err, workspace){
    res.render("workspaces/edit", {workspace})
  })
})


// Update workspace route
router.put("/:id", middleware.confirmWorkspaceOwner, function(req, res){
  Workspace.findByIdAndUpdate(
    req.params.id,
    req.body.workspace,
    function(err, updatedWorkspace){
      res.redirect("/workspaces/" + req.params.id)
    }
  )
})

// Delete a workspace
router.delete("/:id", middleware.confirmWorkspaceOwner, function(req, res){
  Workspace.findByIdAndRemove(
    req.params.id,
    function(err){
      res.redirect("/workspaces")
    }
  )
})

module.exports = router
