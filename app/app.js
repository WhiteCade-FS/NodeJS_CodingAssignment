const express = require("express");
const app = express();
const router = require("./routes");

app.use(express.json());

// `localhost:3000/` is equivelent to below code
app.get("/", (req, res) => {
  console.log("GET");
  res.json({ message: "Hello World!" });
});

//`localhost:3000/api
app.use("/api", router);

app.use((req, res, next) => {
  const error = new Error("Not Found.");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log("ERROR >>> ", err);
});

module.exports = app;
