const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRETKEY);
    req.token = decodedToken;
    next();
  } catch (err) {
    err.message = "Not authenticated ";
    next(err);
  }
};

module.exports.isAdmin = (req, res, next) => {
  // console.log(req.token.role);
  if (req.token.role === "admins") next();
  else throw new Error("Unautherized for this action");
};
module.exports.isAdminOrSeller = (req, res, next) => {
  if (req.token.role === "admins" || req.token.role === "sellers") next();
  else throw new Error("Unautherized for this action");
};
module.exports.isAdminOrcustomer = (req, res, next) => {
  if (req.token.role === "admins" || req.token.role === "customers") next();
  else throw new Error("Unautherized for this action");
};
module.exports.isSeller = (req, res, next) => {
  if (req.token.role === "sellers") next();
  else throw new Error("Unautherized for this action");
};
module.exports.isCustomer = (req, res, next) => {
  if (req.token.role === "customers") next();
  else throw new Error("Unautherized for this action");
};
