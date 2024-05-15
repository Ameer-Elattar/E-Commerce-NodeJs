const express = require("express");
const controller = require("../controllers/adminController");
const {
  insertValidator,
  updateValidator,
  deleteGetOneValidator,
} = require("./../middleware/validations/adminValidator");
const { isAdmin } = require("../middleware/validations/authorizationMW");
const validatonResult = require("../middleware/validations/validatorResult");
const router = express.Router();

router
  .route("/admins")
  .get(isAdmin, controller.getAllAdmins)
  .post(
    isAdmin,
    controller.upload.single("image"),
    insertValidator,
    validatonResult,
    controller.insertAdmin
  )
  .patch(
    isAdmin,
    controller.upload.single("image"),
    updateValidator,
    validatonResult,
    controller.updateAdmin
  );

router
  .route("/admins/:_id")
  .get(isAdmin, deleteGetOneValidator, validatonResult, controller.getAdminById)
  .delete(
    isAdmin,
    deleteGetOneValidator,
    validatonResult,
    controller.deleteAdminById
  );
module.exports = router;
