const adminSchema = require("./../model/adminSchema");

exports.getAllAdmins = (req, res, next) => {
  adminSchema
    .find()
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => next(error));
};

exports.getAdminById = (req, res, next) => {
  adminSchema
    .findById(req.params._id)
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => next(error));
};
exports.insertAdmin = (req, res, next) => {
  let object = new adminSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateAdmin = (req, res, next) => {
  adminSchema
    .findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((data) => {
      res.status(200).json({ message: "updated", data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteAdminById = (req, res, next) => {
  adminSchema
    .findByIdAndDelete(req.params._id)
    .then((data) => {
      res.status(200).json({ message: "deleted", data });
    })
    .catch((error) => next(error));
};
