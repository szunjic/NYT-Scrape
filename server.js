// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

// Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Require routes
var routes = require("./routes");

// Designate public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser in this app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Have every request go through route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


// Listen on the port - Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
