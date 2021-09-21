const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const EmployeesController = require('../../controllers/employees');

//base '/employees'

//GET
router.get("/", EmployeesController.getEmployee);

//POST
router.post("/", EmployeesController.postEmployee);

//PUT
router.put("/", EmployeesController.putEmployee);

//DELETE
router.delete("/", EmployeesController.deleteEmployee);


module.exports = router;
