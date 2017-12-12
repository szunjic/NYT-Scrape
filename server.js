// Dependencies
var express = require("express");
var bodyParser = require("body-parser"); 
var logger = require("morgan"); 
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios"); // promised based http library (similar jQuery's AJAX)
var cheerio = require("cheerio"); // parses HTML and helps us find elements

// Require all models
var db = require("./models");

// Port
var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware -- run on every single request

// Morgan logger for logging requests
app.use(logger("dev"));
// Body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/articleScrape", {
  useMongoClient: true
});

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.User
	.create({ name: 'Ice Cube' })
	.then(function(dbUser) {
		console.log(dbUser);
	})
	.catch(function(error) {
		console.log(error.message)
	});

// Routes

// A GET route for scraping the NYT website
app.get("/", function(req, res) {
	// Grab the body of the html with request 
	axios.get("https://www.nytimes.com/").then(function(response) {
		// Load that into cheerio and save it to $ for a shorthand selector
		var $ = cheerio.load(response.data);

		// Grab every h2 within an article tag, and do the following:
		$("article h2").each(function(i, element) {
			// Save an empty resuly object
			var result = {};

			// Add the text and href of every link, and save them as properties to the result object
			result.title = $(this)
				.children("a")
				.text();
			result.link = $(this)
				.children("a")
				.attr("href");

		// Create a new Article using the 'result' object built from scraping
		
// *** NEED HELP UNDERSTANDING THIS ***
		db.Article
			.create(result)
			.then(function(dbArticle) {
				// If scrape and save Article is a success, send messsage 
				// res.send("Scrape Complete");
				console.log("Scrape Complete");
				console.log(result);
			})
			// .catch(function(error) {
			// 	// If an error, send message 
			// 	res.json(error);
			// });
		});
	});
}); 

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
	// Grab every document in the Articles collection
	db.Article
		.find({})
		.then(function(dbArticle) {
			// If find Article success, send back to client
			res.json(dbArticle);
		})
		.catch(function(error) {
			// If error, send back to client
			res.json(error);
		});
});

// Route for getting a specific Article by id, and populate with it's comments
app.get("/articles/:id", function(req, res) {
	// Using the id passed in the id parameter, prepare a query that finds the matching one in the db..
	db.Article
		.findOne({ _id: req.params.id })
		// .. and populate all of the comments associated with it
		.populate("comment")
		.then(function(dbArticle) {
			// If fidn Article with id success, send back to client
			res.json(dbArticle);
		})
		.catch(function(error) {
			// If an error, send back to client
			res.json(error);
		})
})

// Route for saving/updating an Article's associated Comment
app.post("/articles/:id", function(req, res) {
	// Create a new Comment and pass the req.body to the entry
	db.Comment
		.create(req.body)
		.then(function(dbComment) {
			// If a Comment was created successfully, find one Article with an '_id' equal to 'req.params.id'
			// Update the Article to be associated with the new Comment
			// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
			// Since our mongoose query returns a promise, we can chain another '.then' which recieves the result from the query
			return dbArticle.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id}, { new: true});
		})
		.then(function(dbArticle) {
			// If updated an Article successfully, send back to client 
			res.json(dbArticle);
		})
		.catch(function(error) {
			// If an error, send back to client
			res.json(error);
		});
});



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});



