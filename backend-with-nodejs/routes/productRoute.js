const express = require("express");
const controller = require("../controllers/productController");
const validator = require("../middleware/validations/productValidation");
const validationResult = require("../middleware/validations/validatorResult");
const router = express.Router();

router
  .route("/product/category/:category")
  .get(controller.getProductsByCategory);

router
  .route("/product")
  .get(controller.getAllProducts)
  .post(
    controller.upload.single("image"),
    validator.insertValidator,
    validationResult,
    controller.insertProduct
  )
  .patch(
    controller.upload.single("image"),
    validator.updateValidator,
    validationResult,
    controller.updateProduct
  );

router
  .route("/product/:id")
  .get(controller.getProductByID)
  .delete(controller.deleteProductByID);
module.exports = router;
//
/**
 * TODO:
 *
 * authentication and autherization
 *
 */
