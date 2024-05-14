const { body, param, query } = require("express-validator");
const adminSchema = require("./../../model/adminSchema");
const sellerSchema = require("./../../model/sellerSchema");

exports.insertValidator = [
  body("fullname")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("seller fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" seller fullname lenght > 5"),
  body("password")
    .isString()
    .withMessage("seller password should be string")
    .isLength({ min: 5 })
    .withMessage(" seller password lenght > 5")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "i"
    )
    .withMessage("invalid password"),
  body("email")
    .isEmail()
    .withMessage("invalid mail")
    .custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const sellerObjects = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),
  body("products").isArray().withMessage("seller products should be Array"),
  body("products.*").isInt().withMessage("Products is an array of inteager "),
];

exports.updateValidator = [
  body("_id").isInt().withMessage("seller id should be int"),
  body("fullname")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("seller fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" seller fullname lenght > 5"),
  body("email")
    .isEmail()
    .optional()
    .withMessage("invalid mail")
    .custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const sellerObjects = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),
  body("products")
    .optional()
    .isArray()
    .withMessage("seller products should be Array"),
  body("products.*").isInt().withMessage("Products is an array of inteager "),
];
exports.deleteGetOneValidator = [
  param("_id").isInt().withMessage(" id should be int"),
];
