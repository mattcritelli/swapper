var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Workspace   = require("./models/workspace"),
    seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost/swapper");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/workspaces", function(req,res){
  Workspace.find({}, function(err, allWorkspaces){
    if(err){
      console.log("error", err)
    } else {
      res.render("index", {"workspaces": allWorkspaces});
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
    description: descriptionAdd
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
  res.render("new")
})

app.get("/workspaces/:id", function(req, res){
  var id = req.params.id

  Workspace.findById({_id: id}).populate("comments").exec(function(err, foundWorkspace){
    console.log("outside foundWorkspace", foundWorkspace)
    if(err) {
      console.log("Err in Workspace FindById", err)
    } else {
      console.log("foundWorkspace", foundWorkspace)
      res.render("show", {workspace: foundWorkspace})
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
