const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const AreaController = require('../../controllers/areas');

//base '/areas'

//GET
router.get("/", AreaController.getArea);
router.get("/all", AreaController.getAreaAll);

//POST
router.post("/", AreaController.postArea);

//PUT
router.put("/", AreaController.putArea);

//DELETE
router.delete("/", AreaController.deleteArea);


module.exports = router;
