var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing")
});

app.get("/workspaces", function(req,res){
  var workspaces = [
    {name: 'Denver Apartment', image: "https://farm4.staticflickr.com/3146/2320148152_baee347d9f.jpg"},
    {name: 'Denver Workshare Hot Seat', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-hot-seats.jpg?itok=RJeWaB0l"},
    {name: 'NYC Workshare Dedicated Desk', image: "https://www.modworks.com/sites/default/files/styles/horizontal_block_no_overlay/public/h_block/image/modworks-dedicated-desks.jpg?itok=vlXvKyMH"}
  ]

  res.render("workspaces", {"workspaces": workspaces});

});

app.listen(3000, function(){
  console.log("Swapper has started...");
});
