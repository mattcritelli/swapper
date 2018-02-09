var Workspace   = require("../models/workspace")
var Review      = require("../models/review")

var middlewareObj = {}

middlewareObj.confirmReviewOwner = function(req, res, next){
  if(req.isAuthenticated()){
    Review.findById(req.params.review_id,function(err, review){
      if(err || !review){
        req.flash("error", "Review not found")
        res.redirect("back")
      } else {
        if(review.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You may only edit/delete your own reviews")
          res.redirect("back")
        }
      }
    })
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect("back")
  }
}

middlewareObj.confirmWorkspaceOwner = function(req, res, next){
  if(req.isAuthenticated()){
    Workspace.findById(req.params.id, function(err, workspace){
      if(err || !workspace){
        req.flash("error", "Workspace not found")
        res.redirect("back")
      } else {
        if(workspace.user.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "Only workspace owners can edit/delete workspaces")
          res.redirect("back")
        }
      }
    })
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect("back")
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You must be logged in to do that")
  res.redirect("/login")
}

module.exports = middlewareObj
