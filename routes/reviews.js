var express     = require("express")
var router      = express.Router({mergeParams: true})
var Workspace   = require("../models/workspace")
var Review      = require("../models/review")
var middleware  = require("../middleware")

// New review form
router.get("/new", middleware.isLoggedIn, function(req, res){
  Workspace.findById(req.params.id, function(err, workspace){
    if(err){
      console.log("error finding workspace for new review")
      res.redirect("back")
    } else {
      res.render("reviews/new", {workspace})
    }
  })
})

// Create review
router.post("/", middleware.isLoggedIn, function(req, res){
  Workspace.findById(req.params.id, function(err, workspace){
    if(err){
      console.log("error finding workspace for review:", err)
      res.redirect("/workspaces")
    } else {
      Review.create({text: req.body.review}, function(err, review){
        if(err){
          console.log("error creating review:", err)
          res.redirect("back")
        } else {
          console.log("review created")
          // add author id and username to review and save
          review.author.id = req.user._id
          review.author.username = req.user.username
          review.save()
          // push review into reviews and save workspace
          workspace.reviews.push(review)
          workspace.save();
          req.flash("success", "You have successfully added a review!")
          res.redirect("/workspaces/" + workspace._id)
        }
      })
    }
  })
})

// Edit review
router.get("/:review_id/edit", middleware.confirmReviewOwner, function(req, res){
  Workspace.findById(req.params.id, function(err, workspace){
    if(err || !workspace){
      req.flash("error", "Workspace not found")
      return res.redirect("back")
    }
    Review.findById(req.params.review_id, function(err, review){
      res.render("reviews/edit", {review, workspace_id: req.params.id})
    })
  })
})

// Update review
router.put("/:review_id", middleware.confirmReviewOwner, function(req, res){
  Review.findByIdAndUpdate(
    req.params.review_id,
    {text: req.body.text},
    function(err, updatedReview){
      req.flash("success", "You have successfully updated your review!")
      res.redirect("/workspaces/" + req.params.id)
    }
  )
})

// Delete review
router.delete("/:review_id", middleware.confirmReviewOwner, function(req, res){
  Review.findByIdAndRemove(
    req.params.review_id,
    function(err, deletedReview){
      req.flash("success", "You have successfully deleted your review!")
      res.redirect("back")
    }
  )
})

module.exports = router
