const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const PersonsController = require('../../controllers/persons');

//base '/persons'

//GET
router.get("/privilegeLevel", auth.valid, PersonsController.getPrivilegeLevel);
router.get("/employee", auth.valid, PersonsController.getEmployee);
router.get("/employees", auth.valid, PersonsController.getEmployees);
router.get("/employees/facilities", auth.valid, PersonsController.getEmployees);
router.get("/visitor", auth.valid, PersonsController.getVisitor);

//POST
router.post("/employee", auth.valid, PersonsController.postEmployee);
router.post("/visitor", auth.valid, PersonsController.postVisitor);

//PUT
router.put("/beacon", auth.valid, PersonsController.putBeaconPerson);
router.put("/employee", auth.valid, PersonsController.putEmployee);
router.put("/visitor", auth.valid, PersonsController.putVisitor);

//DELETE
router.delete("/employee", auth.valid, PersonsController.deleteEmployee);
router.delete("/visitor", auth.valid, PersonsController.deleteVisitor);


module.exports = router;
