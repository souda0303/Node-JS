// Import required modules
const express = require("express"); // Import Express.js framework

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./connection");

const app = express(); // Create an Express application instance
const port = 8000; // Set port number for the server to listen on

// connection with mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/project-1").then(() => {
  console.log("MongoDB Connected Successfully!")
})


// Middleware - Plugin to parse urlencoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
