const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const BeaconsController = require('../../controllers/beacons');

//base '/beacons'

//GET
router.get("/", auth.valid, BeaconsController.getBeacon);
router.get("/all", auth.valid, BeaconsController.getBeaconsAll);
router.get("/available", auth.valid, BeaconsController.getBeaconsAvailable);

//POST
router.post("/", auth.valid, BeaconsController.postBeacon);

//PUT
router.put("/", auth.valid, BeaconsController.putBeacon);

//DELETE
router.delete("/:idBeacon", auth.valid, BeaconsController.deleteBeacon);


module.exports = router;
