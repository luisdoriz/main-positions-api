const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const PositionsController = require('../../controllers/positions');

//base '/positions'

//GET
router.get("/", auth.valid, PositionsController.getPositions);

//POST
router.post("/", auth.valid, PositionsController.postPositions);

//PUT
router.put("/", auth.valid, PositionsController.putPositions);

//DELETE
router.delete("/", auth.valid, PositionsController.deletePositions);


module.exports = router;
