const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  image: String,
  price: Number,
  stock: Number,
  rating: Number,
  category: String,
  sellerID: { type: Number, ref: "sellres" },
  productDescription: [String],
  reviews: [String],
});

schema.plugin(autoIncrement, { id: "productID" });
module.exports = mongoose.model("products", schema);
