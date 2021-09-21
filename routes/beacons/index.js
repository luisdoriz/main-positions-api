const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const BeaconsController = require('../../controllers/beacons');

//base '/beacons'

//GET
router.get("/", BeaconsController.getBeacon);

//POST
router.post("/", BeaconsController.postBeacon);

//PUT
router.put("/", BeaconsController.putBeacon);

//DELETE
router.delete("/", BeaconsController.deleteBeacon);


module.exports = router;
