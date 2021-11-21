const express = require("express");
const router = express.Router();
const  auth = require('../../middleware/auth');
const ReportController = require('../../controllers/reports');

//GET
router.post("/facility", auth.valid, ReportController.getFacilityReport);

//POST

module.exports = router;
