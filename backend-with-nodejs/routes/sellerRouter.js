const express = require("express");
const controller = require("../controllers/sellerController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator
} = require("../middleware/validations/sellerValidator");
const validatonResult = require("../middleware/validations/validatorResult");
const router = express.Router();
router
  .route("/seller")
  .get(controller.getAllSellersWithoutProductsInfo)
  .post(insertValidator, validatonResult, controller.insertSeller)
  .patch(updateValidator, validatonResult, controller.updateSeller);

router
  .route("/seller/:_id")
  .get(deleteGetOneValidator, validatonResult, controller.getSellerById)
  .delete(deleteGetOneValidator, validatonResult, controller.deleteSellerById);

router.get("/seller/products", controller.getAllSellersWithProductsInfo)
router.get("/seller/product/:_id", controller.getOneSellerWithProductsInfo)
module.exports = router;
