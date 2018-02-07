var mongoose = require("mongoose");
var ReviewSchema = require("./review")
var UserSchema = require("./user")

var WorkspaceSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
})

module.exports = mongoose.model("Workspace", WorkspaceSchema)
