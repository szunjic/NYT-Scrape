// Grab the articles as a json
$.getJSON("/articles", function(data) {
	// For each one
	for (var i = 0; i < data.length; i++) {
		// Display the apropos information on the page
		$("#articles").append("<p data-id='" + data[i]._id + "'>" 
			+ data[i].title + 
			"<br />" 
			+ data[i].link + "</p>");
	}
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
	// Empty the comments from the comment section
	$("#comments").empty();
	// Save the id from the p tag
	var thisId = $(this).attr("data-id");

	// Make an ajax call for the Article
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	// With that done, add the comment information to the page
	.done(function(data) {
		console.log(data);
		// The title of the article 
		$("#comments").append("<h2>" + data.title + "</h2>");
		// An input to enter the new title 
		$("#comments").append("<input id='titleInput' name='title' >");
		// A textarea to add a new comment body
		$("#comments").append("<textarea id='bodyInput' name='body'></textarea>");
		// A button to submit a new comment, with the id of the article saved to it 
		$("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>")

		// If theres a comment in the article
		if (data.comment) {
			// Place the title of the comment in the comment input
			$("#titleInput").val(data.comment.title);
			// Place the body of the comment in the body textarea
			$("#bodyInput").val(data.comment.body);
		}
	});
});

// When you click the saveComment button
$(document).on("click", "#saveComment", function() {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the comment, using whats entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			title: $("#titleInput").val(),
			// Value taken from comment textarea
			body: $("#bodyInput").val()
		}
	})
	// With that done
	.done(function(data) {
		// Log response
		console.log(data)
		// Empty the comments section
		$("#comments").empty();
	});

	// Remove the values entered in the input and textarea for comment entry
	$("#titleInput").val("");
	$("#bodyInput").val("");
})

