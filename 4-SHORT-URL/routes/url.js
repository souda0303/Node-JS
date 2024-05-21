const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetAllUsers,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/user", handleGetAllUsers);

module.exports = router;
