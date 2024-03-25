const express = require("express");
const morgan = require("morgan");

//setting up server
const server = express();
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("I am listening .....");
});

// logging Middelware

server.use(morgan("dev"));

// routes Middelware

// Not Found Middelware
server.use((req, res) => {
  res.status(404).json({ data: "Not Found" });
});

// Error Middelware
server.use((error, req, res, next) => {
  res.status(500).json({ data: `Error encountered: ${error}` });
});
