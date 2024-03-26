const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  image: String,
  price: Number,
  stock: Number,
  rating: Number,
  sellerID: { type: Number, ref: "seller" },
  category: { _id: { type: Number, ref: "category" }, name: String },
  reviews: [String],
  // objdescription: {
  //   storage: 55,
  //   company: "samsung",
  // }
});

module.exports = mongoose.model("products", schema);

/*
id: 1,
    name: "iphone",
    img: "photo.jpg",
    price: 1000,
    stock: 20,
    rating: 4,
    category: {
      _id: "ref",
      name: "categoryname",
    },
    reviews: [],
    sellerID: 1,
    objdescription: {
      storage: 55,
      company: "samsung",
    },*/
