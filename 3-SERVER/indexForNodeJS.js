const http = require("http");
const fs = require("fs");
const url = require("url");

// Define the request handler function
function myHandler(req, res) {
  // Ignore requests for the favicon
  if (req.url === "/favicon.ico") return res.end();
  
  // Parse the URL to get the pathname and query parameters
  const myURL = url.parse(req.url, true);
  
  // Create a log entry
  const log = `${Date.now()} : ${req.url} ${req.method} New Request Received!\n`;

  // Append the log entry to the log.txt file
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      // Handle any errors that occur while writing to the file
      console.error("Error writing to log file:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    
    // Handle different routes based on the pathname
    switch (myURL.pathname) {
      case "/":
        // Handle the root URL (homepage)
        if (req.method === "GET") {
          res.end("Hello, this is Server Side Homepage!");
        }
        break;

      case "/about":
        // Handle the /about URL, expecting a query parameter "myname"
        const userName = myURL.query.myname;
        res.end(`Hello, ${userName}! Have a good day.`);
        break;

      case "/search":
        // Handle the /search URL, expecting a query parameter "search_query"
        const search = myURL.query.search_query;
        res.end("Here are your results for " + search);
        break;

      case "/signup":
        // Handle the /signup URL
        if (req.method === "GET") {
          // Respond with a message if the request method is GET
          res.end("This is a signup form!");
        } else if (req.method === "POST") {
          // Simulate a database query and respond with a welcome message if the request method is POST
          res.end("Welcome!");
        }
        break;

      default:
        // Handle unknown routes with a 404 Not Found response
        res.end("404 Not Found!");
        break;
    }
  });
}

// Create the HTTP server and pass the request handler function
const myServer = http.createServer(myHandler);

// Start the server and listen on port 8000
myServer.listen(8000, () => {
  console.log("Server listening on http://localhost:8000");
});
