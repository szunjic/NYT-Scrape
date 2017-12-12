var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// New ArticleSchema object
var ArticleSchema = new Schema({
	// 'title' -- required, string
	title: {
		type: String,
		required: true
	}, 
	// 'link' string -- required, string
	link: {
		type: String,
		required: true
	},
	// 'summary' string -- required, strong
	
	// summary: {
	// 	type: String,
	// 	required: true
	// },

	// 'comment' -- object that stores a Comment id 
		// The ref property links the ObjectId to the Comment model
		// This populates the Article with an associated comments
	comment: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}
});

// Creates the model from above schema
var Article = mongoose.model("Article", ArticleSchema);

// Export Article model
module.exports = Article;