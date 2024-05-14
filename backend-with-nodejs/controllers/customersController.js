const customerModel = require("./../model/customerModel");
const multer = require("multer");
const fs = require("fs");
const storage = multer.memoryStorage();

exports.upload = multer({ storage });

exports.getAllCustomers = function (req, res, next) {
  customerModel
    .find({})
    .populate({ path: "cart" })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => next(err));
};

exports.insert = function (req, res, next) {
  const object = new customerModel(req.body);

  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  object
    .save()
    .then((data) => {
      fs.writeFile(
        `public/customers/${object.image}`,
        req.file.buffer,
        (err) => {
          if (err) return next(err);
          res.status(200).json({ data: data });
        }
      );
    })
    .catch((error) => next(error));
};

exports.update = (req, res, next) => {
  const { password, ...updatedBody } = req.body;
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  updatedBody.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  customerModel
    .findOneAndUpdate({ _id: req.body._id }, updatedBody)
    .then((object) => {
      if (!object) throw new Error("customer doesn't exist");
      const imagePath = `public/seller/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
        }
      });
      fs.writeFile(
        `public/customers/${updatedBody.image}`,
        req.file.buffer,
        (err) => {
          if (err) return next(err);
          res.status(200).json({ msg: "updated", data: object });
        }
      );
    })
    .catch((error) => next(error));
};

exports.getCustomerById = (req, res, next) => {
  customerModel
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) throw new Error("customer doesn't exist");
      res.status(200).json({ data: object });
    })
    .catch((err) => next(err));
};

exports.deleteCustomerById = (req, res, next) => {
  customerModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((object) => {
      if (!object) throw new Error("customer doesn't exist");
      const imagePath = `public/customers/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) return next(err);
        res.status(200).json({ msg: "deleted", data: object });
      });
    })
    .catch((err) => next(err));
};
