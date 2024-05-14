const sellerSchema = require("../model/sellerSchema");
const multer = require("multer");
const fs = require("fs");
const storage = multer.memoryStorage();
const bcryptjs = require("bcryptjs");

exports.upload = multer({ storage });

exports.getAllSeller = (req, res, next) => {
  sellerSchema
    .find()
    .populate({ path: "products" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getSellerById = (req, res, next) => {
  sellerSchema
    .findById(req.params._id)
    .populate({ path: "products" })
    .then((object) => {
      if (!object) throw new Error("this seller doesn't exist");
      res.status(200).json({ data: object });
    })
    .catch((error) => next(error));
};
exports.insertSeller = (req, res, next) => {
  let object = new sellerSchema(req.body);
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  object
    .save()
    .then((data) => {
      fs.writeFile(`public/seller/${object.image}`, req.file.buffer, (err) => {
        if (err) next(err);
        res.status(200).json({ data });
      });
    })
    .catch((error) => next(error));
};

exports.updateSeller = (req, res, next) => {
  const { password, ...updatedBody } = req.body;
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  updatedBody.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  sellerSchema
    .findByIdAndUpdate(req.body._id, updatedBody)
    .then((object) => {
      if (!object) throw new Error("seller doesn't exist");
      const imagePath = `public/seller/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
        }
      });
      fs.writeFile(
        `public/seller/${updatedBody.image}`,
        req.file.buffer,
        (err) => {
          if (err) next(err);
          res.status(200).json({ message: "updated", object });
        }
      );
    })
    .catch((error) => next(error));
};

exports.deleteSellerById = (req, res, next) => {
  sellerSchema
    .findByIdAndDelete(req.params._id)
    .then((object) => {
      if (!object) throw new Error("sellect doesn't exist");
      const imagePath = `public/seller/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) next(err);
      });
      res.status(200).json({ message: "deleted", object });
    })
    .catch((error) => next(error));
};
