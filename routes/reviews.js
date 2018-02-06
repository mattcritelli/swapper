var express = require("express")
var router = express.Router({mergeParams: true})
var Workspace   = require("../models/workspace")
var Review   = require("../models/review")

// New review form
router.get("/new", isLoggedIn, function(req, res){
  var id = req.params.id

  Workspace.findById({_id: id}, function(err, workspace){
    if(err){
      console.log("error finding workspace for new review")
    } else {
      res.render("reviews/new", {workspace})
    }
  })
})

// Create review
router.post("/", isLoggedIn, function(req, res){
  Workspace.findById({_id: req.params.id}, function(err, workspace){
    if(err){
      console.log("error finding workspace for review:", err)
      res.redirect("/workspaces")
    } else {
      Review.create({
        text: req.body.review.text,
        author: req.body.review.name
      }, function(err, review){
        if(err){
          console.log("error creating review:", err)
        } else {
          console.log("review created")
          workspace.reviews.push(review)
          workspace.save();
          console.log("review saved")
          res.redirect("/workspaces/" + workspace._id)
        }
      })
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
