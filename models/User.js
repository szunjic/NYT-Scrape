var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// New UsereSchema object
var UserSchema = new Schema({
	// 'name' -- unique, string
	name: {
		type: String,
		unique: true
	}, 
	// 'comments' -- is an array that stores ObjectIds
		// The ref property links these ObjectIds to the Comment model
		// This populates the User with associated comments
	comments: [
	 {
	 	// Store ObjectIds in the array
	 	type: Schema.Types.ObjectId,
	 	// The ObjectIds will refer to the ids in the Comment model
	 	ref: "Comment"
	 }
	]
});

// Creates the model from above schema
var User = mongoose.model("User", UserSchema);

// Export User model
module.exports = User;