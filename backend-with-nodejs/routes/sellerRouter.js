const express = require("express");
const controller = require("../controllers/sellerController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator,
} = require("../middleware/validations/sellerValidator");
const {
  isAdmin,
  isAdminOrSeller,
} = require("../middleware/validations/authorizationMW");
const validatonResult = require("../middleware/validations/validatorResult");
const router = express.Router();
router
  .route("/seller")
  .get(controller.getAllSeller)
  .post(
    isAdmin,
    controller.upload.single("image"),
    insertValidator,
    validatonResult,
    controller.insertSeller
  )
  .patch(
    isAdminOrSeller,
    controller.upload.single("image"),
    updateValidator,
    validatonResult,
    controller.updateSeller
  );

router
  .route("/seller/:_id")
  .get(
    isAdmin,
    deleteGetOneValidator,
    validatonResult,
    controller.getSellerById
  )
  .delete(
    isAdmin,
    deleteGetOneValidator,
    validatonResult,
    controller.deleteSellerById
  );

module.exports = router;
