const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const GatewaysController = require('../../controllers/gateways');

//base '/gateways'

//GET
router.get("/", auth.valid, GatewaysController.getGateways);

//POST
router.post("/", auth.valid, GatewaysController.postGateway);

//PUT
router.put("/:idGateway", auth.valid, GatewaysController.putGateway);
router.put("/area", auth.valid, GatewaysController.putGatewayArea);

//DELETE
router.delete("/:idGateway", auth.valid, GatewaysController.deleteGateway);


module.exports = router;
