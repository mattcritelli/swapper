var mongoose = require("mongoose");
var reviewSchema = require("./review")

var workspaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
})

module.exports = mongoose.model("Workspace", workspaceSchema)
