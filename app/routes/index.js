const express = require("express");
const router = express.Router();
const api = [
  { id: RandomIdGenerator(), description: "A description of the API" },
];

function RandomIdGenerator() {
  return Math.floor(Math.random() * 20_000);
}

// `localhost:3000/api/`
router.get("/", (req, res) => {
  res.status(200).json({ message: "From the API", data: api });
});

// `localhost:3000/api/:ID`
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("params >>> ", id);
  const apiId = api.find((obj) => obj.id === id);
  if (apiId) {
    return res.status(200).json({ message: "From the API", data: apiId });
  } else {
    return res.status(404).json({ message: "API information not found" });
  }
});

router.post("/", (req, res) => {
  console.log("Request body >>>", req.body);
  const { description } = req.body;
  if (description) {
    const newApi = {
      id: RandomIdGenerator(),
      description: description,
    };
    api.push(newApi);
    res.status(200).json({ message: "We got the request", data: newApi });
  } else {
    res.status(404).json({ message: "API info not found" });
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { description } = req.body;
  const apiIndex = api.findIndex((obj) => obj.id === id);
  if (apiIndex !== -1) {
    api[apiIndex].description = description;
    res.status(200).json({ message: "API Updated: ", data: api[apiIndex] });
  } else {
    res.status(404).json({ message: "API info not found" });
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const apiIndex = api.findIndex((obj) => obj.id === id);
  console.log("params >>> ", id);
  if (apiIndex !== -1) {
    const apiDelete = api.splice(apiIndex, 1);
    res
      .status(200)
      .json({ message: "API successfully deleted: ", data: apiDelete[0] });
  } else {
    res.status(404).json({ message: "API info not found" });
  }
});

module.exports = router;
