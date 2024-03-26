const productSchema = require("../model/productSchema");

exports.getAllProducts = (req, res, next) => {
  productSchema
    .find()
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => next(error));
};
exports.getProductByID = (req, res, next) => {
  productSchema
    .findById(req.params._id)
    .then((object) => {
      if (!object) throw new Error("Product doesn't exist");
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};
exports.insertProduct = (req, res, next) => {
  let object = new productSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.updateProduct = (req, res, next) => {
  productSchema
    .updateMany({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      res.status(200).json("Records updated successfully");
    })
    .catch((error) => next(error));
};
exports.deleteProductByID = (req, res, next) => {
  productSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getProductsByCategory = (req, res, next) => {
  productSchema
    .findById(req.params.category)
    .then((object) => {
      if (!object) throw new Error("Product doesn't exist");
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};
