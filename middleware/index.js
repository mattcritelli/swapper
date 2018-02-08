var Workspace   = require("../models/workspace")
var Review      = require("../models/review")

var middlewareObj = {}

middlewareObj.confirmReviewOwner = function(req, res, next){
  if(req.isAuthenticated()){
    Review.findById(req.params.review_id,function(err, review){
      if(err){
        console.log("not authorized", err)
        res.redirect("back")
      } else {
        if(review.author.id.equals(req.user._id)){
          next();
        }
      }
    })
  } else {
    res.redirect("back")
  }
}

middlewareObj.confirmWorkspaceOwner = function(req, res, next){
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

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

module.exports = middlewareObj
