const adminSchema = require("./../model/adminSchema");
const multer = require("multer");
const fs = require("fs");
const storage = multer.memoryStorage();
exports.upload = multer({ storage });
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
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  object
    .save()
    .then((data) => {
      fs.writeFile(`public/admin/${object.image}`, req.file.buffer, (err) => {
        if (err) return next(err);
        res.status(200).json({ data });
      });
    })
    .catch((error) => next(error));
};

exports.updateAdmin = (req, res, next) => {
  const { password, ...updatedBody } = req.body;
  const imageType = req.file.mimetype.split("/")[1];
  if (imageType !== "png" && imageType !== "jpg" && imageType !== "jpeg") {
    throw new Error("Invalid image type. Supported types are: png, jpg, jpeg");
  }
  updatedBody.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  adminSchema
    .findByIdAndUpdate(req.body._id, req.body)
    .then((object) => {
      if (!object) throw new Error("customer doesn't exist");
      const imagePath = `public/seller/${object.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
        }
      });
      fs.writeFile(
        `public/admin/${updatedBody.image}`,
        req.file.buffer,
        (err) => {
          if (err) return next(err);

          res
            .status(200)
            .json({ message: "data updated except password", object });
        }
      );
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteAdminById = (req, res, next) => {
  adminSchema
    .findByIdAndDelete(req.params._id)
    .then((data) => {
      if (!data) throw new Error("admin doesn't exists");
      const imagePath = `public/admin/${data.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) return next(err);
        res.status(200).json({ message: "deleted", data });
      });
    })
    .catch((error) => next(error));
};
