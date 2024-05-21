const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetAllUsers(req, res) {
  const result = await URL.find({});

  return res.json(result);
}

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required!" });
  }
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetAllUsers,
};
