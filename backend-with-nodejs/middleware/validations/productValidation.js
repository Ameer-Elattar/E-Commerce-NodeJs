const { body } = require("express-validator");
const sellerSchema = require("../../model/sellerSchema");

exports.insertValidator = [
  body("name")
    .isString()
    .withMessage("product name is should be a string")
    .isLength({ min: 3 })
    .withMessage("product name should be descriptive"),
  body("price").isDecimal().withMessage("product price should be Number"),
  body("stock").isInt().withMessage("product stock should be Number"),
  body("rating")
    .isInt({ min: 0, max: 5 })
    .withMessage("product rating should be Number"),
  body("category")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("category name sould be string"),
  body("sellerID")
    .isInt()
    .withMessage("seller ID should be an Number")
    .custom((value) => {
      return sellerSchema
        .find(value)
        .then((object) => {
          if (!object) throw new Error("seller doesn't exists");
        })
        .catch((err) => next(err));
    }),
  body("productDescription")
    .isArray()
    .withMessage("product description is an Array"),
  body("productDescription.*")
    .isString()
    .withMessage("productDescription values is String "),
  body("reviews")
    .optional()
    .isArray()
    .withMessage("product description is an Array"),
  body("reviews.*")
    .optional()
    .isString()
    .withMessage("reviews values is String "),
];
exports.updateValidator = [
  body("_id").isInt().withMessage("Product ID must be an Number"),
  body("name")
    .optional()
    .isString()
    .withMessage("product name is should be a string")
    .isLength({ min: 3 })
    .withMessage("product name should be descriptive"),
  body("price")
    .optional()
    .isDecimal()
    .withMessage("product price should be Number"),
  body("stock")
    .optional()
    .isInt()
    .withMessage("product stock should be Number"),
  body("rating")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("product rating should be Number"),
  body("category")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("category name sould be string"),
  body("sellerID")
    .optional()
    .isInt()
    .withMessage("seller ID should be an Number")
    .custom((value) => {
      return sellerSchema
        .find(value)
        .then((object) => {
          if (!object) throw new Error("seller doesn't exists");
        })
        .catch((err) => next(err));
    }),
  body("productDescription")
    .optional()
    .isArray()
    .withMessage("product description is an object"),
  body("productDescription.*")
    .optional()
    .isString()
    .withMessage("productDescription values is String "),
  body("reviews")
    .optional()
    .isArray()
    .withMessage("product description is an Array"),
  body("reviews.*")
    .optional()
    .isString()
    .withMessage("reviews values is String "),
];
