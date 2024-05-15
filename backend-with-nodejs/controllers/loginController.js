const sellerSchema = require("../model/sellerSchema");
const adminSchema = require("../model/adminSchema");
const customerSchema = require("../model/customerModel");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = (req, res, next) => {
  let user = null;
  let role = null;

  Promise.all([
    adminSchema.findOne({ email: req.body.email }),
    sellerSchema.findOne({ email: req.body.email }),
    customerSchema.findOne({ email: req.body.email }),
  ])
    .then((results) => {
      user = results.find((user) => user !== null);
      if (user) {
        role = user.constructor.modelName.toLowerCase(); 
        bcryptjs
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) throw new Error("Invalid password");
            let token = jwt.sign(
              { _id: user._id, role: role },
              process.env.SECRETKEY,
              { expiresIn: "1hr" }
            );
            res.status(200).json({ action: `${role} Authenticated`, token });
          })
          .catch((err) => next(err));
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => next(err));
};
