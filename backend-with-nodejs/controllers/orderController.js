const orderSchema = require("../model/orderSchema");

exports.getAllOrders = function (req, res, next) {
  orderSchema
    .find()
    .populate({ path: "customerID" })
    .populate({ path: "products.product" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};
exports.getOrderByCustomerID = function (req, res, next) {
  orderSchema
    .findOne({ customerID: req.params.id })
    .then((object) => {
      if (!object) throw new Error("order doesn't exist");
      res.status(200).json({ data: object });
    })
    .catch((err) => next(err));
};

exports.addOrder = function (req, res, next) {
  const object = new orderSchema(req.body);
  object
    .save()
    .then(() => {
      res.status(201).json({ msg: "order added", data: object });
    })
    .catch((err) => next(err));
};

exports.deleteOrder = function (req, res, next) {
  orderSchema
    .findByIdAndDelete(req.params.id)
    .then((object) => {
      if (!object) throw new Error("order doesn't exist");
      res.status(200).json({ msg: "deleted", data: object });
    })
    .catch((err) => next(err));
};

exports.updateOrder = function (req, res, next) {
  orderSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) throw new Error("order doesn't exist");
      res.status(200).json({ msg: "updated", data: object });
    })
    .catch((err) => next(err));
};
