const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const OrganizationsController = require('../../controllers/organizations');

//base '/organizations'

//GET
router.get("/", OrganizationsController.getOrganizations);

//POST
router.post("/", OrganizationsController.postOrganization);

//PUT
router.put("/:idOrganization", OrganizationsController.putOrganization);

//DELETE
router.delete("/:idOrganization", OrganizationsController.deleteOrganization);


module.exports = router;
