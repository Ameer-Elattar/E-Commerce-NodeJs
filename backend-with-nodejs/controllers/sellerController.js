const sellerSchema = require("../model/sellerSchema");


exports.getAllSellersWithoutProductsInfo = (req, res, next) => {
  sellerSchema.find()
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))

};
exports.getAllSellersWithProductsInfo = (req, res, next) => {
  sellerSchema.find().populate({ path: "products" }).then(data => {
    res.status(200).json({ data })
  })
    .catch(error => next(error))
};
exports.getSellerById = (req, res, next) => {
  sellerSchema.findById(req.params._id)
    .then(data => {
      res.status(200).json({ data: data });
    })
    .catch(error => next(error))
};
exports.insertSeller = (req, res, next) => {


  let object = new sellerSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateSeller = (req, res, next) => {
  sellerSchema.findByIdAndUpdate(req.body._id, req.body, { new: true }).then(data => {
    res.status(200).json({ message: 'updated', data })
  })
    .catch(error => {
      next(error)
    })
};

exports.deleteSellerById = (req, res, next) => {
  sellerSchema.findByIdAndDelete(req.params._id).then(data => {
    res.status(200).json({ message: 'deleted', data })
  })
    .catch(error => next(error))
};

exports.getOneSellerWithProductsInfo = (req, res, next) => {
  sellerSchema.find({ _id: req.params._id }).populate({ path: "products" }).then(data => {
    res.status(200).json({ data })
  })
    .catch(error => next(error))
};
