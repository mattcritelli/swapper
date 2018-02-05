var mongoose = require("mongoose");
var reviewSchema = require("./review")

var WorkspaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
})

module.exports = mongoose.model("Workspace", WorkspaceSchema)
