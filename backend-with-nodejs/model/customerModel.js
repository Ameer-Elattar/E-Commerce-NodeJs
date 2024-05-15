const mongoose = require("mongoose");
const sequence = require("mongoose-sequence")(mongoose);
const bcryptjs = require("bcryptjs");

const schemaCustomer = new mongoose.Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String, unique: true },
  address: String,
  image: String,
  balance: Number,
  cart: [{ type: Number, ref: "products" }],
});

schemaCustomer.pre("save", function (next) {
  bcryptjs.genSalt().then((salt) => {
    bcryptjs
      .hash(this.password, salt)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => next(err));
  });
});
schemaCustomer.plugin(sequence, { id: "Customers_counter" });

module.exports = mongoose.model("customers", schemaCustomer);
