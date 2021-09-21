const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const GatewaysController = require('../../controllers/gateways');

//base '/gateways'

//GET
router.get("/", auth.valid, GatewaysController.getGateways);

//POST
router.post("/", auth.valid, GatewaysController.postGateways);

//PUT
router.put("/", auth.valid, GatewaysController.putGateways);

//DELETE
router.delete("/", auth.valid, GatewaysController.deleteGateways);


module.exports = router;
