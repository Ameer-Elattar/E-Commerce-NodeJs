const express = require("express");
const controller = require("./../controllers/customersController");
const validator = require("./../middleware/validations/customersValidator");
const validatorResult = require("./../middleware/validations/validatorResult");

const router = express.Router();

router
  .route("/customers")
  .get(controller.getAllCustomers)
  .post(
    controller.upload.single("image"),
    validator.insert,
    validatorResult,
    controller.insert
  )
  .patch(
    controller.upload.single("image"),
    validator.update,
    validatorResult,
    controller.update
  );

router
  .route("/customers/:id")
  .get(controller.getCustomerById)
  .delete(controller.deleteCustomerById);

module.exports = router;
