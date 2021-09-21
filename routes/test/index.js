const express = require("express");
const router = express.Router();
//const { auth } = require('../../middleware/auth');
const TestController = require('../../controllers/testController');

//GET
router.get("/", TestController.getRoles);

//POST

module.exports = router;
