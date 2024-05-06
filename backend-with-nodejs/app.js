const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const customersRoute = require("./routes/customerRoute");
const adminRouter = require("./routes/adminRouter");
const sellerRouter = require("./routes/sellerRouter");
const productRouter = require("./routes/productRoute");
const server = express();
const port = process.env.PORT || 4444;

mongoose
  .connect(
    `mongodb+srv://amro7275:${process.env.PASSWORD_DATABASE}@mycluster.oigyqve.mongodb.net/E-Commerce`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

server.use(express.static('public'))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(adminRouter);
server.use(sellerRouter);
server.use(productRouter);
server.use(customersRoute);

server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});
