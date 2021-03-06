const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const CasesController = require('../../controllers/cases');

//base '/cases'

//GET
router.get("/active", auth.valid, CasesController.getActiveCases);
router.get("/recovered", auth.valid, CasesController.getRecoveredCases);
router.get("/:idCase/atRisk", auth.valid, CasesController.getCaseAtRiskPersons);

//POST
router.post("/", auth.valid, CasesController.postCase);

//PUT
router.put("/", auth.valid, CasesController.putCase);

//DELETE
router.delete("/:idCase", auth.valid, CasesController.deleteCase);


module.exports = router;
