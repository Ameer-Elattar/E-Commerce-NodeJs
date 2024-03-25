const { body, param, query } = require("express-validator");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("admin id should be int"),
  body("fullname")
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" admin fullname lenght>5"),
  body("password").isString()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail"),

  body("image").isString()
    .withMessage("invalid mail").withMessage("admin image should be string"),

];

exports.updateValidator = [
  body("_id")
    .isInt()
    .withMessage("admin id should be int"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("password").isString().optional()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("email").isEmail().optional()
    .withMessage("invalid mail"),

  body("image").isString().optional()
    .withMessage("invalid mail").withMessage("admin image should be string"),


];
exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];