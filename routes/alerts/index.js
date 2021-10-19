const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const AlertsController = require('../../controllers/alerts');

//GET
router.get("/", AlertsController.getAlerts);

//POST
router.post("/", AlertsController.postAlert);

//PUT
router.put("/", AlertsController.putAlert);

//DELETE
router.delete("/:idAlert", AlertsController.deleteAlert);

module.exports = router;
