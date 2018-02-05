var mongoose = require("mongoose");
var Workspace = require("./models/workspace");
var Review = require("./models/review")

var data = [
  {name: "Buenos Aires Home Office",
  image: "https://s-media-cache-ak0.pinimg.com/originals/90/86/28/908628c347b96f93d6be6eaf44b3a1cd.jpg",
  description: "Downtown location, great wifi!"},
  {name: "Rome CoWorking Hot Seat",
  image: "https://s3-us-west-2.amazonaws.com/s3.sharedesk.net/workspaces/040d45ccc13c070fcec9d46ccd0cc543-medium.png",
  description: "Friendly people and good coffee. Dog friendly!"},
  {name: "Denver Apartment",
  image: "http://cpvmarketingplatform.info/img/146227/making-a-home-office-in-your-apartment.jpg?1517123176",
  description: "Capitol Hill, nice building"},
  {name: "New York City Apartment",
  image: "https://s-media-cache-ak0.pinimg.com/originals/1d/af/df/1dafdf6284b6262255b8642b1e275e67.jpg",
  description: "In east village, great area!"}
]

function seedDB(){
  // Remove all workspaces
  Review.remove({}, function(err){
    if(err){
      console.log("Error removing reviews")
    }
    Workspace.remove({}, function(err){
      if(err){
        console.log('error in seedDB remove', err);
      }
      console.log("Removed all workspaces");
      console.log("Seeding data...");
      data.forEach(function(seed){
        Workspace.create(seed, function(err, workspace){
          if(err){
            console.log("error creating workspace:", workspace);
          } else {
            console.log("\nSeed created:", workspace)
            Review.create({
              text: "Cool space. Loved it! Can't wait to come back!",
              author: "Will"
            }, function(err, review){
              if(err){
                console.log('err from review create in seedDb', err)
              } else {
                workspace.reviews.push(review);
                workspace.save();
              }
            })
          }
        })
      })
    })
  })
}

module.exports = seedDB;
