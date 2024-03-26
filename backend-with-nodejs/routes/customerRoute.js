const express = require('express');
const customersController = require('./../controllers/customersController');
const customersValidator = require('./../middleware/validations/customersValidator');
const validatorResult = require('./../middleware/validations/validatorResult');



const router = express.Router();



router.route('/customers')
        .get(customersController.getAllCustomers)
        .post(customersValidator.insert,validatorResult,customersController.insert)
        .patch(customersValidator.update,validatorResult,customersController.update);

router.route('/customers/:id')
        .get(customersController.getCustomerById)
        .delete(customersController.deleteCustomerById);

       

module.exports=router;