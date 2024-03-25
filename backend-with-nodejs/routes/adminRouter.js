const express = require("express");
const controller = require("../controllers/adminController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator
} = require("./../middleware/validations/adminValidator");
const validatonResult = require("../middleware/validations/validatorResult");
const router = express.Router();
router
  .route("/admins")
  .get(controller.getAllAdmins)
  .post(insertValidator, validatonResult, controller.insertAdmin)
  .patch(updateValidator, validatonResult, controller.updateAdmin);

router
  .route("/admins/:_id")
  .get(deleteGetOneValidator, validatonResult, controller.getAdminById)
  .delete(deleteGetOneValidator, validatonResult, controller.deleteAdminById);
module.exports = router;
