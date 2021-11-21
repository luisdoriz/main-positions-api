const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const OrganizationsController = require('../../controllers/organizations');

//base '/organizations'

//GET
router.get("/", auth.valid, OrganizationsController.getOrganizations);

//POST
router.post("/", auth.valid, OrganizationsController.postOrganization);

//PUT
router.put("/:idOrganization", auth.valid, OrganizationsController.putOrganization);

//DELETE
router.delete("/:idOrganization", auth.valid, OrganizationsController.deleteOrganization);


module.exports = router;
