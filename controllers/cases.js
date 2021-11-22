const Cases = require("../actions/cases");
const Persons = require("../actions/persons");

exports.getActiveCases = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const cases = await Cases.readActiveCases({ idOrganization });
    res.status(200).json({ status: "success", data: cases });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getCaseAtRiskPersons = async (req, res) => {
  try {
    const { idCase } = req.params;
    const persons = await Cases.readAtRiskPersons({ idCase });
    res.status(200).json({ status: "success", data: persons });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getRecoveredCases = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const cases = await Cases.readRecoveredCases({ idOrganization });
    res.status(200).json({ status: "success", data: cases });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.postCase = async (req, res) => {
  const { idEmployee, date } = req.body;
  try {
    const { idPerson } = await Persons.readEmployee({ idEmployee });
    const beacon = await Cases.createCase({
      from: date,
      to: undefined,
      ongoing: true,
      idPerson,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: beacon });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putCase = async (req, res) => {
  const { idCase, toDate, ongoing } = req.body;
  try {
    const editedCase = await Cases.updateCase({
      idCase,
      to: toDate,
      ongoing,
    });
    res.status(200).json({ status: "success", data: editedCase });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.deleteCase = async (req, res) => {
  const { idCase } = req.params;
  try {
    await Cases.deleteCase({
      idCase,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};
