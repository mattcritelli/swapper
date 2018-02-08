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
router.post("/", isLoggedIn, function(req, res){
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var user = {
    id: req.user._id,
    username: req.user.username
  }

  Workspace.create({
    name: name,
    image: image,
    description: description,
    user: user
  }, function(err, workspace){
    if(err){
      console.log("error", err)
    } else {
      console.log("\n workspace saved:", workspace)
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
router.get("/:id/edit", confirmWorkspaceOwner, function(req, res){
  Workspace.findById(req.params.id, function(err, workspace){
    res.render("workspaces/edit", {workspace})
  })
})


// Update workspace route
router.put("/:id", confirmWorkspaceOwner, function(req, res){
  Workspace.findByIdAndUpdate(
    req.params.id,
    req.body.workspace,
    function(err, updatedWorkspace){
      res.redirect("/workspaces/" + req.params.id)
    }
  )
})

// Delete a workspace
router.delete("/:id", confirmWorkspaceOwner, function(req, res){
  Workspace.findByIdAndRemove(
    req.params.id,
    function(err){
      res.redirect("/workspaces")
    }
  )
})

// ==== CHECK IF USER IS LOGGED IN ====
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

// ==== CHECK IF USER IS LOGGED IN ====

function confirmWorkspaceOwner(req, res, next){
  if(req.isAuthenticated()){
    Workspace.findById(req.params.id, function(err, workspace){
      if(err){
        res.redirect("back")
      } else {
        if(workspace.user.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back")
  }
}


module.exports = router
