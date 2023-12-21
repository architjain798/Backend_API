// routes/films.js
const express = require("express");
const router = express.Router();

const axios = require("axios");
const redis = require("../redis/redis-client");

const makeCallToFilmAPI = async () => {
  let response = await axios.get("https://swapi.dev/api/people");
  console.log("response", response);
  await redis.set("peoples", JSON.stringify(response?.data?.results));
  await redis.expire("peoples", 1800);

  return response?.data?.results;
};

const genderTypeCount = (peopleList, genderInput) => {
  let cnt = 0;
  for (const element of peopleList) {
    if (element?.gender === genderInput.toLowerCase()) cnt++;
  }
  return cnt;
};

const getNameGreaterThanHeight = (peopleData, heightInput) => {
  let cnt = [];
  for (const element of peopleData) {
    if (element?.height > heightInput) cnt.push(element?.name);
  }
  return cnt;
};

// GET request for /api/films
router.get("/", async (req, res) => {
  try {
    let peopleCache = await redis.get("peoples");

    if (peopleCache) {
      console.log("Cache Hit");
      return res.send(peopleCache);
    }

    let response = await makeCallToFilmAPI();

    console.log("Cache Miss");

    return res.send(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST request for /api/films
router.get("/gender-count/:genderType", async (req, res) => {
  try {
    let genderInput = req.params.genderType;

    let peopleCache = await redis.get("peoples");

    if (peopleCache) {
      let peopleData = JSON.parse(peopleCache);

      let cnt = genderTypeCount(peopleData, genderInput);

      return res.status(200).send({ count: cnt });
    }

    let response = await makeCallToFilmAPI();

    let cnt = genderTypeCount(response, genderInput);

    return res.status(200).send({ count: cnt });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/height/:heightInput", async (req, res) => {
  try {
    let heightInput = req.params.heightInput;

    let peopleCache = await redis.get("peoples");

    if (peopleCache) {
      let peopleData = JSON.parse(peopleCache);

      let cnt = getNameGreaterThanHeight(peopleData, heightInput);

      return res.status(200).send({ count: cnt });
    }

    let response = await makeCallToFilmAPI();

    let cnt = getNameGreaterThanHeight(response, heightInput);

    return res.status(200).send({ count: cnt });
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
