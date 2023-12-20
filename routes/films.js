// routes/films.js
const express = require("express");
const router = express.Router();

// GET request for /api/posts
router.get("/", (req, res) => {
  // Your logic to fetch posts
  res.json({ message: "GET request to /api/films" });
});

// POST request for /api/films
router.post("/", (req, res) => {
  // Your logic to handle the posted data
  const postData = req.body;
  res.json({ message: "POST request to /api/films", data: postData });
});

module.exports = router;
