const { body, param, query } = require("express-validator");
const adminSchema = require("./../../model/adminSchema");
const sellerSchema = require("./../../model/sellerSchema");

exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("seller id should be int"),
  body("fullname")
    .isAlpha()
    .withMessage("seller fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" seller fullname lenght>5").custom(async (value) => {
      const adminObjects = await adminSchema.find({ fullname: value });
      const sellerObjects = await sellerSchema.find({ fullname: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("This fullname already exists");
      }

      return true;
    }),
  body("password").isString()
    .withMessage("seller password should be string")
    .isLength({ min: 5 })
    .withMessage(" seller fullname lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail").custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const sellerObjects = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),
  body("image").isString()
    .withMessage("invalid mail").withMessage("seller image should be string"),
  body("products").isArray()
    .withMessage("seller products should be Array").custom((value) => {

      for (let i = 0; i < value.length; i++) {
        if (typeof (value[i]) != "number") {

          throw new Error("seller products should contain only integers");
        }
      }
      return true;
    }),

];

exports.updateValidator = [
  body("_id")
    .isInt()
    .withMessage("seller id should be int"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("seller fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" seller fullname lenght>5").custom(async (value) => {
      const adminObjects = await adminSchema.find({ fullname: value });
      const sellerObjects = await sellerSchema.find({ fullname: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("This fullname already exists");
      }

      return true;
    }),
  body("password").isString().optional()
    .withMessage("seller password should be string")
    .isLength({ min: 5 })
    .withMessage(" seller fullname lenght>5"),
  body("email").isEmail().optional()
    .withMessage("invalid mail").custom(async (value) => {
      const adminObjects = await adminSchema.find({ email: value });
      const sellerObjects = await sellerSchema.find({ email: value });

      if (adminObjects.length > 0 || sellerObjects.length > 0) {
        return Promise.reject("Email already exists");
      }

      return true;
    }),

  body("image").isString().optional()
    .withMessage("invalid mail").withMessage("seller image should be string"),
  body("products").optional().isArray()
    .withMessage("seller products should be Array").custom((value) => {

      for (let i = 0; i < value.length; i++) {
        if (typeof (value[i]) != "number") {

          throw new Error("seller products should contain only integers");
        }
      }
      return true;
    }),


];
exports.deleteGetOneValidator = [
  param("_id").isInt()
    .withMessage(" id should be int"),
];