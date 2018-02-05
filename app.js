var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Workspace   = require("./models/workspace"),
    seedDB      = require("./seeds"),
    Review      = require("./models/review")


mongoose.connect("mongodb://localhost/swapper");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/workspaces", function(req,res){
  Workspace.find({}, function(err, workspaces){
    if(err){
      console.log("error", err)
    } else {
      res.render("workspaces/index", {workspaces});
    }
  })
});

app.post("/workspaces", function(req, res){
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

app.get("/workspaces/new", function(req, res){
  res.render("workspaces/new")
})

app.get("/workspaces/:id", function(req, res){
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

// COMMENT ROUTES

app.get("/workspaces/:id/reviews/new", function(req, res){
  var id = req.params.id

  Workspace.findById({_id: id}, function(err, workspace){
    if(err){
      console.log("error finding workspace for new review")
    } else {
      res.render("reviews/new", {workspace})
    }
  })
})

app.post("/workspaces/:id/reviews", function(req, res){
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






app.listen(3000, function(){
  console.log("Swapper has started...");
});



// Workspace.create({
//   name: "Rome CoWorking Hot Desk",
//   image: "https://s3-us-west-2.amazonaws.com/s3.sharedesk.net/workspaces/040d45ccc13c070fcec9d46ccd0cc543-medium.png",
//   description: "Located in the city center. Friendly people. Great coffee and wifi!",
// }, function(err, workspace){
//   if(err){
//     console.log("error", err)
//   } else {
//     console.log("\n workspace created:", workspace)
//     res.redirect("/workspaces")
//   }
// })
