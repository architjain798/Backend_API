const express = require("express");
const redis = require("./redis/redis-client");

console.log(redis);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server started");
});
