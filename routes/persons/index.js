const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const PersonsController = require('../../controllers/persons');

//base '/persons'

//GET
router.get("/", PersonsController.getPersons);
router.get("/employee", PersonsController.getEmployee);
router.get("/visitor", PersonsController.getVisitor);

//POST
router.post("/", PersonsController.postPersons);
router.post("/employee", PersonsController.postEmployee);
router.post("/visitor", PersonsController.postVisitor);

//PUT
router.put("/", PersonsController.putPersons);
router.put("/employee", PersonsController.putEmployee);
router.put("/visitor", PersonsController.putVisitor);

//DELETE
router.delete("/", PersonsController.deletePersons);
router.delete("/employee", PersonsController.deleteEmployee);
router.delete("/visitor", PersonsController.deleteVisitor);


module.exports = router;
