const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 8002;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("Error reading uploads directory", err);
      files = [];
    }
    res.render("homepage", { files });
  });
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
