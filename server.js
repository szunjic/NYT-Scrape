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








// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});



