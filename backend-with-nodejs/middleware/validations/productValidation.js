const { body, param } = require("express-validator");

exports.insertValidator = [
  body("_id").isInt().withMessage("Product ID must be an Number"),
  body("name")
    .isString()
    .withMessage("product name is should be a string")
    .isLength({ min: 3 })
    .withMessage("product name should be descriptive"),
  body("image").isString().withMessage("image is String"),
  body("price").isDecimal().withMessage("product price should be Number"),
  body("stock").isInt().withMessage("product stock should be Number"),
  body("rating")
    .isInt({ min: 0, max: 5 })
    .withMessage("product rating should be Number"),
  body("category").isObject().withMessage("category should be an object"),
  body("category._id")
    .isInt() // TODO: check if it exist in DB
    .withMessage("referenced category id shpuld be Number"),
  body("category.name")
    .isAlpha("en-US", { ignore: " " }) // TODO: check if it exist in DB
    .withMessage("category name sould be string"),
  body("sellerID").isInt().withMessage("seller ID should be an Number"), // check if it exit in DB
  body("productDescription")
    .isObject()
    .withMessage("product description is an object"),
];
exports.updateValidator = [
  body("_id").isInt().withMessage("Product ID must be an Number"),
  body("name")
    .optional()
    .isString()
    .withMessage("product name is should be a string")
    .isLength({ min: 3 })
    .withMessage("product name should be descriptive"),
  body("image").optional().isString().withMessage("image is String"),
  body("price")
    .optional()
    .isInt()
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
    .isObject()
    .withMessage("category should be an object"),
  body("category._id")
    .isInt() // TODO: check if it exist in DB
    .withMessage("referenced category id shpuld be Number"),
  body("category.name")
    .isAlpha("en-US", { ignore: " " }) // TODO: check if it exist in DB
    .withMessage("category name sould be string"),
  body("sellerID")
    .optional()
    .isInt()
    .withMessage("seller ID should be an Number"), // check if it exit in DB
  body("productDescription")
    .optional()
    .isObject()
    .withMessage("product description is an object"),
];
