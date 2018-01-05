// Scrape script

// Require scraping tools (axios and cheerio)
var axios = require("axios"); // promised based http library (similar jQuery's AJAX)
var cheerio = require("cheerio"); // parses HTML and helps us find elements

// Function to scrape the NYT website
var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("http://www.nytimes.com").then(function(res) {
    var $ = cheerio.load(res.data);
    // Make an empty array to save article info
    var articles = [];

    // Find and loop through each element that has the "theme-summary" class
    $(".theme-summary").each(function(i, element) {
      // In each .theme-summary, grab the child with the class story-heading

      // Grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

      // Grab any children with the class of summary and then grab it's inner text
      // Store this to the sum variable. This is the article summary
      var sum = $(this)
        .children(".summary")
        .text()
        .trim();

      // As long as the headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy the headlines and summaries
        // Removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object to push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in backend can use it
module.exports = scrape;
