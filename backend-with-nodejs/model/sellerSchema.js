const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  products: [{ type: Number, ref: "products" }]
});


module.exports = mongoose.model("sellres", schema);
