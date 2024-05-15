const express = require("express");
const controller = require("../controllers/orderController");
const validator = require("../middleware/validations/orderValidator");
const validatorResult = require("../middleware/validations/validatorResult");
const { isAdmin } = require("../middleware/validations/authorizationMW");

const router = express.Router();

router
  .route("/orders")
  .get(isAdmin, controller.getAllOrders)
  .post(validator.insert, validatorResult, controller.addOrder)
  .patch(validator.update, validatorResult, controller.updateOrder);

router
  .route("/orders/customers/:id")
  .get(isAdmin, controller.getOrderByCustomerID);

router.route("/orders/:id").delete(isAdmin, controller.deleteOrder);

module.exports = router;
