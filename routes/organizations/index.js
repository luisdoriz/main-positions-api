const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const OrganizationsController = require('../../controllers/organizations');

//base '/organizations'

//GET
router.get("/", OrganizationsController.getOrganizations);

//POST
router.post("/", OrganizationsController.postOrganizations);

//PUT
router.put("/", OrganizationsController.putOrganizations);

//DELETE
router.delete("/", OrganizationsController.deleteOrganizations);


module.exports = router;
