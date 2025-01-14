const http = require("http");
require("dotenv").config();
const app = require("./app/app");

http.createServer(app).listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
