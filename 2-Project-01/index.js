// Import required modules
const express = require("express"); // Import Express.js framework
const users = require("./MOCK_DATA.json"); // Import user data from JSON file
const fs = require("fs"); // Import filesystem module
const app = express(); // Create an Express application instance
const port = 8000; // Set port number for the server to listen on

// Middleware - Plugin to parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));

/* This middleware logs each incoming request to a file named "log.txt" 
along with the timestamp, HTTP method, and requested path. It then proceeds 
to the next middleware in the request-response cycle */
app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${new Date().toLocaleTimeString()} : ${req.method} : ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

// Route to render HTML document listing users
app.get("/users", (req, res) => {
  // Generate HTML content dynamically using user data
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  // Send HTML response to client
  return res.send(html);
});

// REST API to list all users as JSON
app.get("/api/users", (req, res) => {
  /* Always add X to custom header for understanding in better
     way thay it is a custom header */
  res.setHeader("X-myName", "Souvik Das"); // custom header

  // Send user data as JSON response to client
  return res.json(users);
});

// Route to handle individual user actions
app
  .route("/api/users/:id")
  // GET request to retrieve a specific user
  .get((req, res) => {
    // Extract user ID from request parameters
    const id = Number(req.params.id);
    // Find user with matching ID
    const user = users.find((user) => user.id === id);
    // Check if user exists
    if (user) {
      // Send user data as response to client
      return res.send(user);
    } else {
      // If user not found, send error response
      return res.status(404).send({ error: "User not found" });
    }
  })
  // PATCH request to modify user data
  .patch((req, res) => {
    // Extract user ID from request parameters
    const id = Number(req.params.id);
    // Extract updated user data from request body
    const userBody = req.body;
    // Find index of user in the array
    const userIndex = users.findIndex((user) => user.id === id);

    // Check if user exists
    if (userIndex !== -1) {
      // Create updated user object by merging existing user data with updated data
      const updatedUser = { ...users[userIndex], ...userBody };
      // Update user data in the array
      users[userIndex] = updatedUser;

      // Write updated user data back to JSON file
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        // Check for errors during file write operation
        if (err) {
          // If error occurs, send error response
          console.error(err);
          return res
            .status(500)
            .json({ status: "error", message: "Failed to save data" });
        }
        // If write operation successful, send success response with updated user data
        return res.json({ status: "Successful", user: updatedUser });
      });
    } else {
      // If user not found, send error response
      return res.status(404).json({ status: "User not found!" });
    }
  })
  // DELETE request to delete user data
  .delete((req, res) => {
    // Extract user ID from request parameters
    const id = Number(req.params.id);
    // Find index of user in the array
    const userIndex = users.findIndex((user) => user.id === id);

    // Check if user exists
    if (userIndex !== -1) {
      // Remove user from array
      users.splice(userIndex, 1);

      // Write updated user data back to JSON file
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        // Check for errors during file write operation
        if (err) {
          // If error occurs, send error response
          return res
            .status(500)
            .json({ status: "error", message: "Failed to fetch the data!" });
        }
        // If write operation successful, send success response
        return res.json({ status: "Successful" });
      });
    } else {
      // If user not found, send error response
      return res.status(404).json({ status: "User Not Found!" });
    }
  });

// POST request to add a new user
app.post("/api/users", (req, res) => {
  // Extract user data from request body
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({msg: "All fields are required..."})
  }
  // Generate unique ID for new user
  const newUser = { id: users.length + 1, ...body };
  // Add new user to the array
  users.push(newUser);

  // Write updated user data back to JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // Check for errors during file write operation
    if (err) {
      // If error occurs, send error response
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save data" });
    }
    // If write operation successful, send success response with details of new user
    return res.status(201).json({ status: "success", user: newUser });
  });
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  // Print message to console when server starts
  console.log(`Server listening on http://localhost:${port}`);
});
