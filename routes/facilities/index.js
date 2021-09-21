const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const FacilitiesController = require('../../controllers/facilities');

//base '/facilities'

//GET
router.get("/", FacilitiesController.getFacilities);

//POST
router.post("/", FacilitiesController.postFacilities);

//PUT
router.put("/", FacilitiesController.putFacilities);

//DELETE
router.delete("/", FacilitiesController.deleteFacilities);


module.exports = router;
