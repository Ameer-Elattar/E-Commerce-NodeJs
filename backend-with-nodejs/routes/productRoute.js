const express = require("express");
const controller = require("../controllers/productController");
const validator = require("../middleware/validations/productValidation");
const validationResult = require("../middleware/validations/validatorResult");
const router = express.Router();

router
  .route("/product/:id")
  .get(controller.getProductByID)
  .delete(controller.deleteProductByID);
router.route("/product/category").get(controller.getProductsByCategory);
router
  .route("/product")
  .get(controller.getAllProducts)
  .post(validator.insertValidator, validationResult, controller.insertProduct)
  .patch(validator.updateValidator, validationResult, controller.updateProduct);

module.exports = router;
