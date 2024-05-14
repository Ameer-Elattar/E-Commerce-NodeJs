const { body } = require("express-validator");

exports.insert = [
  body("firstName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("FirstName must be string")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "First name must be at least 3 letters and maximum 20 letters."
    ),
  body("lastName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("LastName must be string")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Last name must be at least 3 letters and maximum 20 letters."
    ),
  body("email").isEmail().withMessage("Email not valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "i"
    )
    .withMessage("invalid password"),
  body("phone").isInt().withMessage("phone must be number"),
  body("address")
    .isString()
    .withMessage("address must be string")
    .isLength({ min: 3, max: 200 })
    .withMessage("address must be at least 3 letters and maximum 200 letters."),
  body("balance").isNumeric().withMessage("balance must be number"),
  body("cart").isArray().withMessage("cart in an array"),
  body("cart.*").isInt().withMessage("cart is an array containing ProductID"),
];

exports.update = [
  body("_id").isInt().withMessage("_id must be number"),
  body("firstName")
    .optional()
    .isAlpha()
    .withMessage("FirstName must be string")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "First name must be at least 3 letters and maximum 20 letters."
    ),
  body("lastName")
    .optional()
    .isAlpha()
    .withMessage("LastName must be string")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Last name must be at least 3 letters and maximum 20 letters."
    ),
  body("email").optional().isEmail().withMessage("Email not valid"),
  body("phone").optional().isInt().withMessage("phone must be number"),
  body("address")
    .optional()
    .isString()
    .withMessage("address must be string")
    .isLength({ min: 3, max: 200 })
    .withMessage("address must be at least 3 letters and maximum 200 letters."),
  body("balance").optional().isNumeric().withMessage("balance must be number"),
];
