const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const embeddedProduct = new mongoose.Schema(
  {
    product: { type: Number, ref: "products" },
    quantity: Number,
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: Number,
  status: String,
  date: { type: Date, default: Date.now },
  customerID: { type: Number, ref: "customers" },
  products: [embeddedProduct],
});

schema.plugin(autoIncrement, { id: "order_id" });

module.exports = mongoose.model("orders", schema);
