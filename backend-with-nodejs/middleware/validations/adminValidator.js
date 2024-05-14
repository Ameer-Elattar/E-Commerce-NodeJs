const { body, param, query } = require("express-validator");
const adminSchema = require("./../../model/adminSchema");
const sellerSchema = require("./../../model/sellerSchema");
exports.insertValidator = [
  body("fullname")
    .isAlpha("en-US", { ignore: "" })
    .withMessage("admin fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" admin fullname lenght > 3"),
  body("password")
    .isString()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght > 5")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "i"
    )
    .withMessage("invalid password"),
  ,
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
];

exports.updateValidator = [
  body("_id").isInt().withMessage("admin id should be int"),
  body("fullname")
    .optional()
    .isAlpha("en-US", { ignore: "" })
    .withMessage("admin fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" admin fullname lenght > 3"),
  body("email")
    .isEmail()
    .optional()
    .withMessage("invalid email")
    .custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const sellerObjects = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),
];
exports.deleteGetOneValidator = [
  param("_id").isInt().withMessage(" id should be int"),
];
