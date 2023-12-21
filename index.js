const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

// Use routes from the "routes" folder
const peoplesRoutes = require("./routes/people");

app.use("/api/peoples", peoplesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server started at ${}PORT}`);
});
