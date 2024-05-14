const productSchema = require("../model/productSchema");
const multer = require("multer");
const fs = require("fs");
const storage = multer.memoryStorage();

exports.upload = multer({ storage: storage });

exports.getAllProducts = (req, res, next) => {
  productSchema
    .find({})
    .populate({ path: "sellerID" })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => next(error));
};
exports.getProductByID = (req, res, next) => {
  productSchema
    .findById(req.params.id)
    .populate({ path: "sellerID" })
    .then((object) => {
      if (!object) throw new Error("Product doesn't exist");
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};
exports.insertProduct = (req, res, next) => {
  let object = new productSchema(req.body);
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;

  object
    .save()
    .then((data) => {
      fs.writeFile(
        `public/products/${object.image}`,
        req.file.buffer,
        (err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({ data });
        }
      );
    })
    .catch((error) => next(error));
};

exports.updateProduct = (req, res, next) => {
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  req.body.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  productSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) throw new Error("product doesb't exist");
      const imagePath = `public/seller/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
        }
      });
      fs.writeFile(
        `public/products/${req.body.image}`,
        req.file.buffer,
        (err) => {
          if (err) return next(err);
          res.status(200).json({ msg: "Records updated successfully", object });
        }
      );
    })
    .catch((error) => next(error));
};
exports.deleteProductByID = (req, res, next) => {
  productSchema
    .findByIdAndDelete(req.params.id)
    .then((object) => {
      if (!object) throw new Error("Product doesn't exist");
      const imagePath = `./public/products/${object.image}`;
      FS.unlink(imagePath, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ data });
      });
    })
    .catch((error) => next(error));
};
exports.getProductsByCategory = (req, res, next) => {
  console.log(req.params.id);
  productSchema
    .find({ category: req.params.category })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
