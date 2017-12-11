var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// New CommentSchema object
var CommentSchema = new Schema({
  // 'title' -- string
  title: String,
  // `body` -- string
  body: String
});

// Creates the model from above schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export Comment model
module.exports = Comment;