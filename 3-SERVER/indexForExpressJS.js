// Import the Express module
const express = require("express");

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = 8000;

// Define a route handler for the root URL ("/")
app.get("/", (req, res) => {
  // Send a response for the root URL
  return res.send("Hello, this is server side Homepage!");
});

// Define a route handler for the "/about" URL
app.get("/about", (req, res) => {
  // Check if there are any query parameters in the request
  if (Object.keys(req.query).length === 0) {
    // If no query parameters, send a simple response
    return res.send("Hello, this is server side about section!\n");
  } else {
    // If query parameters are present, extract "name" and "age"
    const name = req.query.name ? req.query.name : "unknown";
    const age = req.query.age ? req.query.age : "unknown";

    // Send a personalized response based on the query parameters
    return res.send(
      "Hello, this is server side about section!\n" +
      "Hello " + name + ", you are " + age + " years old!"
    );
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server listening on http://localhost:8000`);
});
