const express = require("express");
const controller = require("./../controllers/customersController");
const validator = require("./../middleware/validations/customersValidator");
const validatorResult = require("./../middleware/validations/validatorResult");
const {
  isAdmin,
  isAdminOrcustomer,
} = require("../middleware/validations/authorizationMW");

const router = express.Router();

router
  .route("/customers")
  .get(isAdmin, controller.getAllCustomers)
  .post(
    isAdmin,
    controller.upload.single("image"),
    validator.insert,
    validatorResult,
    controller.insert
  )
  .patch(
    isAdminOrcustomer,
    controller.upload.single("image"),
    validator.update,
    validatorResult,
    controller.update
  );

router
  .route("/customers/:id")
  .get(isAdmin, controller.getCustomerById)
  .delete(isAdmin, controller.deleteCustomerById);

module.exports = router;
