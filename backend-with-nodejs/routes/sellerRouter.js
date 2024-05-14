const express = require("express");
const controller = require("../controllers/sellerController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator,
} = require("../middleware/validations/sellerValidator");
const validatonResult = require("../middleware/validations/validatorResult");
const router = express.Router();
router
  .route("/seller")
  .get(controller.getAllSeller)
  .post(
    controller.upload.single("image"),
    insertValidator,
    validatonResult,
    controller.insertSeller
  )
  .patch(
    controller.upload.single("image"),
    updateValidator,
    validatonResult,
    controller.updateSeller
  );

router
  .route("/seller/:_id")
  .get(deleteGetOneValidator, validatonResult, controller.getSellerById)
  .delete(deleteGetOneValidator, validatonResult, controller.deleteSellerById);

module.exports = router;
