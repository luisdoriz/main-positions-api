const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const FacilitiesController = require('../../controllers/facilities');

//base '/facilities'

//GET
router.get("/", auth.valid, FacilitiesController.getFacilities);
router.get("/areas/:idFacility", auth.valid, FacilitiesController.getAreasFacility);

//POST
router.post("/", auth.valid, FacilitiesController.postFacilities);

//PUT
router.put("/:idFacility", auth.valid, FacilitiesController.putFacilities);

//DELETE
router.delete("/", auth.valid, FacilitiesController.deleteFacilities);


module.exports = router;
