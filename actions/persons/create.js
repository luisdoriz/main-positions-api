const { Employee, Visitor, Person } = require("../../models");

const createEmployee = async ({
  name,
  firstLastName,
  secondLastName,
  email,
  idFacility,
  idBeacon,
  internalId,
  isActive,
  idPrivilegeLevel,
  CreatedBy,
  UpdatedBy,
}) => {
  const person = await Person.create({
    name,
    firstLastName,
    secondLastName,
    email,
    idFacility,
    idBeacon,
    isActive,
    idPrivilegeLevel,
    CreatedBy,
    UpdatedBy,
  });
  await Employee.create({
    idPerson: person.idPerson,
    internalId,
    isActive,
    CreatedBy,
    UpdatedBy,
  });
};

const createVisitor = async ({
  name,
  firstLastName,
  secondLastName,
  email,
  idFacility,
  idBeacon,
  expirationDate,
  isActive,
  idPrivilegeLevel,
  CreatedBy,
  UpdatedBy,
}) => {
  const person = await Person.create({
    name,
    firstLastName,
    secondLastName,
    email,
    idFacility,
    idBeacon,
    isActive,
    idPrivilegeLevel,
    CreatedBy,
    UpdatedBy,
  });
  await Visitor.create({
    idPerson: person.idPerson,
    expirationDate,
    isActive,
    CreatedBy,
    UpdatedBy,
  });
};

module.exports = {
  createEmployee,
  createVisitor,
};
