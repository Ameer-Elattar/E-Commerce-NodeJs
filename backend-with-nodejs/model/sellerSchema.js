const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const bcryptjs = require("bcryptjs");

const schema = new mongoose.Schema({
  _id: { type: Number },
  fullname: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  products: [{ type: Number, ref: "products" }],
});

schema.pre("save", function (next) {
  bcryptjs
    .genSalt()
    .then((salt) => {
      bcryptjs.hash(this.password, salt).then((hash) => {
        this.password = hash;
        next();
      });
    })
    .catch((err) => next(err));
});

schema.plugin(autoIncrement, { id: "seller_id" });
module.exports = mongoose.model("sellres", schema);
