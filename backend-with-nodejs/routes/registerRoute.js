const express = require("express");

const customerContoller = require("../controllers/customersController");
const sellerController = require("../controllers/sellerController");

const customerValidator = require("../middleware/validations/customersValidator");
const sellerValidator = require("../middleware/validations/sellerValidator");
const validatorResult = require("../middleware/validations/validatorResult");

const router = express.Router();

router
  .route("/register/customer")
  .post(
    customerContoller.upload.single("image"),
    customerValidator.insert,
    validatorResult,
    customerContoller.insert
  );
router
  .route("/register/seller")
  .post(
    sellerController.upload.single("image"),
    sellerValidator.insertValidator,
    validatorResult,
    sellerController.insertSeller
  );

module.exports = router;
