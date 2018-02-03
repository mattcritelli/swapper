const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("this will be landing page.")
})

app.listen(3000, function(){
  console.log("Swapper has started...");
})
