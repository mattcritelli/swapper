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
      Review.create({text: req.body.review}, function(err, review){
        if(err){
          console.log("error creating review:", err)
        } else {
          console.log("review created")
          // add author id and username to review and save
          review.author.id = req.user._id
          review.author.username = req.user.username
          review.save()
          // push review into reviews and save workspace
          workspace.reviews.push(review)
          workspace.save();
          res.redirect("/workspaces/" + workspace._id)
        }
      })
    }
  })
})

// Edit review
router.get("/:review_id/edit", confirmReviewOwner, function(req, res){
  Review.findById(req.params.review_id, function(err, review){
    console.log("review", review)
    res.render("reviews/edit", {review, workspace_id: req.params.id})
  })
})

// Update review
router.put("/:review_id", confirmReviewOwner, function(req, res){
  Review.findByIdAndUpdate(
    req.params.review_id,
    {text: req.body.text},
    function(err, updatedReview){
      res.redirect("/workspaces/" + req.params.id)
    }
  )
})

// Delete review
router.delete("/:review_id", confirmReviewOwner, function(req, res){
  Review.findByIdAndRemove(
    req.params.review_id,
    function(err, deletedReview){
      res.redirect("back")
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

function confirmReviewOwner(req, res, next){
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

module.exports = router


// // Edit review
// router.get("/:review_id/edit", confirmReviewOwner, function(req, res){
//   Review.findById(req.params.review_id, function(err, review){
//     if(err){
//       console.log("error in edit review route", err)
//       res.redirect("back")
//     } else {
//       console.log("review", review)
//       res.render("reviews/edit", {review, workspace_id: req.params.id})
//     }
//   })
// })
//
// // Update review
// router.put("/:review_id", confirmReviewOwner, function(req, res){
//   Review.findByIdAndUpdate(
//     req.params.review_id,
//     {text: req.body.text},
//     function(err, updatedReview){
//       if(err){
//         console.log("error is update review put route", err)
//         res.redirect("back")
//       } else {
//         console.log("updatedReview?", updatedReview)
//         res.redirect("/workspaces/" + req.params.id)
//       }
//     }
//   )
// })


// <% if(currentUser && review.author.id.equals(req.user._id)){ %>
