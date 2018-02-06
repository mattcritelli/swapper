var mongoose = require("mongoose");
var Workspace = require("./models/workspace");
var Review = require("./models/review")

var data = [
  {name: "Buenos Aires Home Office",
  image: "https://s-media-cache-ak0.pinimg.com/originals/90/86/28/908628c347b96f93d6be6eaf44b3a1cd.jpg",
  description: "Lorem ipsum dolor amet trust fund af artisan fingerstache tilde. Readymade 8-bit poutine blog, subway tile ugh seitan master cleanse locavore la croix next level retro. Fashion axe church-key raclette stumptown gastropub wayfarers tumblr. Godard taiyaki chartreuse, lumbersexual swag pok pok pitchfork unicorn gochujang skateboard. PBR&B chia cronut aesthetic vexillologist slow-carb banh mi cred actually letterpress coloring book. Vexillologist vinyl XOXO pabst iPhone actually. Yuccie tumblr vaporware cardigan semiotics artisan, try-hard narwhal actually chartreuse twee ramps 90's sustainable typewriter."},
  {name: "Rome CoWorking Hot Seat",
  image: "https://s3-us-west-2.amazonaws.com/s3.sharedesk.net/workspaces/040d45ccc13c070fcec9d46ccd0cc543-medium.png",
  description: "Disrupt intelligentsia wayfarers adaptogen XOXO. Vaporware selvage tilde 3 wolf moon, direct trade squid iPhone man bun health goth synth everyday carry. Air plant PBR&B fixie keffiyeh bicycle rights before they sold out kogi. Cray everyday carry celiac unicorn. PBR&B pitchfork fam, chambray iPhone etsy shabby chic fixie four loko tbh. Taxidermy semiotics distillery, roof party master cleanse shaman viral gluten-free cliche 3 wolf moon. Church-key banh mi small batch wayfarers viral gluten-free, health goth blog meditation occupy authentic glossier literally."},
  {name: "Denver Apartment",
  image: "http://cpvmarketingplatform.info/img/146227/making-a-home-office-in-your-apartment.jpg?1517123176",
  description: "Capitol Hill, nice building"},
  {name: "New York City Apartment",
  image: "https://s-media-cache-ak0.pinimg.com/originals/1d/af/df/1dafdf6284b6262255b8642b1e275e67.jpg",
  description: "Plaid knausgaard gentrify put a bird on it fam. Hoodie hashtag marfa, jean shorts keffiyeh kinfolk kitsch small batch art party hell of blog scenester twee biodiesel tousled. Ennui next level lyft twee, keffiyeh brunch schlitz marfa polaroid air plant irony. Knausgaard iPhone forage, stumptown trust fund YOLO organic chartreuse meditation. Prism next level williamsburg yuccie heirloom. Deep v artisan mixtape selfies trust fund art party williamsburg."}
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
      // console.log("Seeding data...");
      // data.forEach(function(seed){
      //   Workspace.create(seed, function(err, workspace){
      //     if(err){
      //       console.log("error creating workspace:", workspace);
      //     } else {
      //       console.log("\nSeed created:")
      //       Review.create({
      //         text: "Cool space. Loved it! Can't wait to come back!",
      //         author: "Will"
      //       }, function(err, review){
      //         if(err){
      //           console.log('err from review create in seedDb', err)
      //         } else {
      //           workspace.reviews.push(review);
      //           workspace.save();
      //         }
      //       })
      //     }
      //   })
      // })
    })
  })
}

module.exports = seedDB;
