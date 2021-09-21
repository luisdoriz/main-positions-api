const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const PositionsController = require('../../controllers/positions');

//base '/positions'

//GET
router.get("/", PositionsController.getPositions);

//POST
router.post("/", PositionsController.postPositions);

//PUT
router.put("/", PositionsController.putPositions);

//DELETE
router.delete("/", PositionsController.deletePositions);


module.exports = router;
