const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const AlertsController = require('../../controllers/alerts');

//GET
router.get("/", auth.valid, AlertsController.getAlerts);
router.get("/types", auth.valid, AlertsController.getAlertTypes);

//POST
router.post("/", auth.valid, AlertsController.postAlert);

//PUT
router.put("/", auth.valid, AlertsController.putAlert);

//DELETE
router.delete("/:idAlert", auth.valid, AlertsController.deleteAlert);

module.exports = router;
