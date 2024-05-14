const { body } = require("express-validator");
const productSchema = require("../../model/productSchema");
const customerSchema = require("../../model/customerModel");

exports.insert = [
  body("date").isDate().withMessage("date of order must be date"),
  // body("total").isNumeric().withMessage("total of order must be number"),
  body("status")
    .isIn([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "completed",
      "cancelled",
    ])
    .withMessage(
      "status must be between (pending or processing or shipped or delivered or completed or cancelled)"
    ),
  body("customerID")
    .isInt()
    .custom((value) => {
      return customerSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("customer doesn't exsit");
      });
    }),
  body("products").isArray().withMessage("Products is an array"),
  body("products.*")
    .isObject()
    .withMessage(
      "producs is an array of object with keys productID and quantity"
    ),
  body("products.*.product")
    .isInt()
    .custom((value) => {
      return productSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("product doesn't exist");
      });
    }),
];
exports.update = [
  body("_id").isInt().withMessage("id must be a number"),
  body("date").optional().isDate().withMessage("date of order must be date"),
  // body("total").isNumeric().withMessage("total of order must be number"),
  body("status")
    .optional()
    .isIn([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "completed",
      "cancelled",
    ])
    .withMessage(
      "status must be between (pending or processing or shipped or delivered or completed or cancelled)"
    ),
  body("customerID")
    .optional()
    .isInt()
    .custom((value) => {
      return customerSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("customer doesn't exsit");
      });
    }),
  body("products").optional().isArray().withMessage("Products is an array"),
  body("products.*")
    .optional()
    .isObject()
    .withMessage(
      "producs is an array of object with keys productID and quantity"
    ),
  body("products.*.product")
    .optional()
    .isInt()
    .custom((value) => {
      return productSchema.findOne({ _id: value }).then((object) => {
        if (!object) throw new Error("product doesn't exist");
      });
    }),
];
