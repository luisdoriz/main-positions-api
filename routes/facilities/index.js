const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const FacilitiesController = require('../../controllers/facilities');

//base '/facilities'

//GET
router.get("/", auth.valid, FacilitiesController.getFacilities);
router.get("/areas/:idFacility", auth.valid, FacilitiesController.getAreasFacility);

//POST
router.post("/", auth.valid, FacilitiesController.postFacility);

//PUT
router.put("/:idFacility", auth.valid, FacilitiesController.putFacility);

//DELETE
router.delete("/:idFacility", auth.valid, FacilitiesController.deleteFacility);


module.exports = router;
