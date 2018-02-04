var mongoose = require("mongoose");
var commentSchema = require("./comment")

var workspaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
})

module.exports = mongoose.model("Workspace", workspaceSchema)
