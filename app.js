var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/swapper");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var workspaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var Workspace = mongoose.model("Workspace", workspaceSchema)

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

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/workspaces", function(req,res){
  Workspace.find({}, function(err, allWorkspaces){
    if(err){
      console.log("error", err)
    } else {
      // console.log("\n allWorkspacess found:", allWorkspaces)
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
  res.render("new")
})

app.get("/workspaces/:id", function(req, res){
  var id = req.params.id
  Workspace.findById(id, function(err, foundWorkspace){
    if(err) {
      console.log("Err in Workspace FindById", err)
    } else {
      // console.log("Found workspace", foundWorkspace)
      res.render("show", {workspace: foundWorkspace})
    }
  })


  // console.log("\n id:", id)
  // console.log("\nworkspace:", workspace)
})

app.listen(3000, function(){
  console.log("Swapper has started...");
});
