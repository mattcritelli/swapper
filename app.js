var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var workspaces = [
  {name: 'Denver Apartment', image: "https://odis.homeaway.com/odis/listing/a39a7c85-06a8-40c7-a5b2-f99175a7338e.c10.jpg"},
  {name: 'Denver Workshare Hot Seat', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-hot-seats.jpg?itok=RJeWaB0l"},
  {name: 'NYC Workshare Dedicated Desk', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-dedicated-desks.jpg?itok=vlXvKyMH"},
  {name: 'Denver Apartment', image: "https://odis.homeaway.com/odis/listing/a39a7c85-06a8-40c7-a5b2-f99175a7338e.c10.jpg"},
  {name: 'Denver Workshare Hot Seat', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-hot-seats.jpg?itok=RJeWaB0l"},
  {name: 'NYC Workshare Dedicated Desk', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-dedicated-desks.jpg?itok=vlXvKyMH"},
  {name: 'Denver Apartment', image: "https://odis.homeaway.com/odis/listing/a39a7c85-06a8-40c7-a5b2-f99175a7338e.c10.jpg"}
]

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/workspaces", function(req,res){
  res.render("workspaces", {"workspaces": workspaces});
});

app.post("/workspaces", function(req, res){
  var name = req.body.name
  var image = req.body.image
  var newWorkspace = {name: name, image: image}
  workspaces.push(newWorkspace)
  res.redirect("/workspaces")
});

app.get("/workspaces/new", function(req, res){
  res.render("new")
})

app.listen(3000, function(){
  console.log("Swapper has started...");
});
