const { body, param, query } = require("express-validator");
const sellerSchema = require("./../../model/sellerSchema");
exports.insertValidator = [
  body("_id")
    .isInt()
    .withMessage("admin id should be int"),
  body("fullname")
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 3 })
    .withMessage(" admin fullname lenght>5").custom(async (value) => {
      const objects = await sellerSchema.find({ fullname: value });
      if (objects.length > 0) {
        return Promise.reject("this fullname  already exists");
      }
      return true;
    }),
  body("password").isString()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("email").isEmail()
    .withMessage("invalid mail").custom(async (value) => {
      const objects = await sellerSchema.find({ email: value });
      if (objects.length > 0) {
        return Promise.reject("email already exists");
      }
      return true;
    }),

  body("image").isString()
    .withMessage("invalid mail").withMessage("admin image should be string"),
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
    .withMessage("admin id should be int"),
  body("fullname")
    .optional()
    .isAlpha()
    .withMessage("admin fullname should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5").custom(async (value) => {
      const objects = await sellerSchema.find({ fullname: value });
      if (objects.length > 0) {
        return Promise.reject("this fullname  already exists");
      }
      return true;
    }),
  body("password").isString().optional()
    .withMessage("admin password should be string")
    .isLength({ min: 5 })
    .withMessage(" admin fullname lenght>5"),
  body("email").isEmail().optional()
    .withMessage("invalid mail").custom(async (value) => {
      const objects = await sellerSchema.find({ email: value });
      if (objects.length > 0) {
        return Promise.reject("email already exists");
      }
      return true;
    }),

  body("image").isString().optional()
    .withMessage("invalid mail").withMessage("admin image should be string"),
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