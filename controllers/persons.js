const Persons = require("../actions/persons");
const Facilites = require("../actions/facilities");
const PrivilegeLevel = require("../actions/priviledgeLevels");

exports.putBeaconPerson = async (req, res) => {
  //links a beacon to a person
  const { idPerson, idBeacon, isActive } = req.body;
  try {
    const person = await Persons.updateBeaconPerson({
      idPerson,
      idBeacon,
      isActive,
      UpdatedBy: req.user.idUser,
    });
    res.status(200).json({ status: "success", data: person });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getPrivilegeLevel = async (req, res) => {
  try {
    const { idFacility } = req.query;
    const pl = await PrivilegeLevel.readPrivilegeLevels({ idFacility });
    res.status(200).json({ status: "success", data: pl });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

//********************************EMPLOYEE****************************************
exports.getEmployee = async (req, res) => {
  const { idEmployee } = req.params;
  try {
    const employee = await Persons.readEmployee({ idEmployee });
    res.status(200).json({ status: "success", data: employee });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const employees = await Persons.readEmployees({ idOrganization });
    res.status(200).json({ status: "success", data: employees });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getEmployeesFacilities = async (req, res) => {
  //gets all employees grouped by facility (used in cases frontend)
  try {
    const employees = await Persons.readEmployeesFacilities();
    res.status(200).json({ status: "success", data: employees });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.postEmployee = async (req, res) => {
  const {
    name,
    firstLastName,
    secondLastName,
    email,
    idFacility,
    idBeacon,
    internalId,
  } = req.body;
  const { idOrganization } = req.user;
  try {
    //validate user creating visitor can only create visitors in same organization
    const facilities = await Facilites.readFacilityByIdOrganization({
      idOrganization,
    });
    const orgIdFacilities = facilities.map((f) => f.idFacility);
    if (!orgIdFacilities.includes(idFacility))
      return res.status(400).json({
        status: "error",
        message:
          "User is not allowed to create visitors in other organizations",
      });
    const employee = await Persons.createEmployee({
      name,
      firstLastName,
      secondLastName,
      email,
      idFacility,
      idBeacon,
      internalId,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: employee });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putEmployee = async (req, res) => {
  const { idEmployee } = req.params;
  const {
    name,
    firstLastName,
    secondLastName,
    email,
    idFacility,
    idBeacon,
    internalId,
    isActive,
  } = req.body;
  try {
    const updatedEmployee = await Persons.updateEmployee({
      idEmployee,
      name,
      firstLastName,
      secondLastName,
      email,
      idFacility,
      idBeacon,
      internalId,
      isActive,
      UpdatedBy: req.user.idUser,
    });
    res.status(200).json({ status: "success", data: updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { idEmployee } = req.params;
    const employee = await Persons.deleteEmployee({ idEmployee });
    res.status(200).json({ status: "success", data: employee });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

//********************************VISITORS****************************************
exports.getVisitor = async (req, res) => {
  return;
};

exports.getVisitors = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const visitors = await Persons.readVisitors({ idOrganization });
    res.status(200).json({ status: "success", data: visitors });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.postVisitor = async (req, res) => {
  const {
    name,
    firstLastName,
    secondLastName,
    email,
    idFacility,
    idBeacon,
    expirationDate,
  } = req.body;
  const { idOrganization } = req.user; //used to validate person creating visitor is in same organization
  try {
    //validate user creating visitor can only create visitors in same organization
    const facilities = await Facilites.readFacilityByIdOrganization({
      idOrganization,
    });
    const orgIdFacilities = facilities.map((f) => f.idFacility);
    if (!orgIdFacilities.includes(idFacility))
      return res.status(400).json({
        status: "error",
        message:
          "User is not allowed to create visitors in other organizations",
      });
    const visitor = await Persons.createVisitor({
      name,
      firstLastName,
      secondLastName,
      email,
      idFacility,
      idBeacon,
      expirationDate,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: visitor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putVisitor = async (req, res) => {
  return;
};

exports.deleteVisitor = async (req, res) => {
  try {
    const { idVisitor } = req.params;
    const visitor = await Persons.deleteVisitor({ idVisitor });
    res.status(200).json({ status: "success", data: visitor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};
