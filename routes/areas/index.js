const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const AreaController = require('../../controllers/areas');

//base '/areas'

//GET
router.get("/", auth.valid, AreaController.getArea);
router.get("/all", auth.valid, AreaController.getAreaAll);

//POST
router.post("/", auth.valid, AreaController.postArea);
router.post("/areaEdge", auth.valid, AreaController.postAreaEdge);
router.post("/edge", auth.valid, AreaController.postEdge);
router.post("/vertex", auth.valid, AreaController.postVertex);

//PUT
router.put("/", auth.valid, AreaController.putArea);
router.put("/areaEdge", auth.valid, AreaController.postAreaEdge);
router.put("/edge", auth.valid, AreaController.postEdge);
router.put("/vertex", auth.valid, AreaController.putVertex);

//DELETE
router.delete("/", auth.valid, AreaController.deleteArea);


module.exports = router;
