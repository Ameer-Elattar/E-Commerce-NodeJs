const {body} = require('express-validator');


exports.insert = [
    body("firstName").isAlpha().withMessage("FirstName must be string").isLength({min:3, max:20}).withMessage("First name must be at least 3 letters and maximum 20 letters."),
    body("lastName").isAlpha().withMessage("LastName must be string").isLength({min:3, max:20}).withMessage("Last name must be at least 3 letters and maximum 20 letters."),
    body("email").isEmail().withMessage("Email not valid"),
    body("password").isLength({ min: 8 }) .withMessage("Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "i"),
    body("phone").isNumeric().withMessage("phone must be number"),
    body("address").isString().withMessage("address must be string").isLength({min:3, max:200}).withMessage("address must be at least 3 letters and maximum 200 letters."),
    body("img").isString().withMessage("img must be string"),
    body("balance").isNumeric().withMessage("balance must be number"),
    body("orders").optional().isArray().withMessage("orders must be array"),
    body("orders.*._id").isInt().withMessage("id of order must be number"),
    body("orders.*.date").isDate().withMessage("date of order must be date"),
    body("orders.*.total").isNumeric().withMessage("total of order must be number"),
    body("orders.*.status").isIn(["pending", "processing", "shipped", "delivered", "completed","cancelled"]).withMessage("status must be between (pending or processing or shipped or delivered or completed or cancelled)"),
    body("orders.*.products").isArray().withMessage("products of order must be array"),
    body("orders.*.products.*._id").isInt().withMessage("id of product must be number"),
    body("orders.*.products.*.price").isNumeric().withMessage("price of product must be number"),
    body("orders.*.products.*.quantity").isInt().withMessage("quantity of product must be number"), 

]

exports.update = [
    body("_id").isInt().withMessage("id must be number"),
    body("firstName").optional().isAlpha().withMessage("FirstName must be string").isLength({min:3, max:20}).withMessage("First name must be at least 3 letters and maximum 20 letters."),
    body("lastName").optional().isAlpha().withMessage("LastName must be string").isLength({min:3, max:20}).withMessage("Last name must be at least 3 letters and maximum 20 letters."),
    body("email").optional().isEmail().withMessage("Email not valid"),
    body("password").optional().isLength({ min: 8 }) .withMessage("Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "i"),
    body("phone").optional().isNumeric().withMessage("phone must be number"),
    body("address").optional().isString().withMessage("address must be string").isLength({min:3, max:200}).withMessage("address must be at least 3 letters and maximum 200 letters."),
    body("img").optional().isString().withMessage("img must be string"),
    body("balance").optional().isNumeric().withMessage("balance must be number"),
    body("orders").optional().isArray().withMessage("orders must be array"),
    body("orders.*._id").optional().isInt().withMessage("id of order must be number"),
    body("orders.*.date").optional().isDate().withMessage("date of order must be date"),
    body("orders.*.total").optional().isNumeric().withMessage("total of order must be number"),
    body("orders.*.status").optional().isIn(["pending", "processing", "shipped", "delivered", "completed","cancelled"]).withMessage("status must be between (pending or processing or shipped or delivered or completed or cancelled)"),
    body("orders.*.products").optional().isArray().withMessage("products of order must be array"),
    body("orders.*.products.*._id").optional().isInt().withMessage("id of product must be number"),
    body("orders.*.products.*.price").optional().isNumeric().withMessage("price of product must be number"),
    body("orders.*.products.*.quantity").optional().isInt().withMessage("quantity of product must be number"), 

]
