// routes/films.js
const express = require("express");
const router = express.Router();

const axios = require("axios");
const redis = require("../redis/redis-client");

const makeCallToFilmAPI = async () => {
  let response = await axios.get("https://swapi.dev/api/people");
  console.log("response", response);
  await redis.set("films", JSON.stringify(response?.data?.results));
  await redis.expire("films", 1800);

  return response?.data?.results;
};

// GET request for /api/films
router.get("/", async (req, res) => {
  try {
    let filmCache = await redis.get("films");

    if (filmCache) {
      console.log("Cache Hit");
      return res.send(filmCache);
    }

    let response = await makeCallToFilmAPI();

    console.log("Cache Miss");

    return res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST request for /api/films
router.post("/", (req, res) => {
  // Your logic to handle the posted data
  const postData = req.body;
  res.json({ message: "POST request to /api/films", data: postData });
});

module.exports = router;
