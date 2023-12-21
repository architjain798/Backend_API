const express = require("express");
const cors = require("cors");
const redis = require("./redis/redis-client");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

// Use routes from the "routes" folder
const filmsRoutes = require("./routes/films");
// const peoplesRoutes = require("./routes/people");
// const planetsRoutes = require("./routes/planet");

app.use("/api/films", filmsRoutes);
// app.use("/api/peoples", peoplesRoutes);
// app.use("/api/planets", planetsRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("server started");
});
