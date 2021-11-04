const { Person, Employee } = require("../../models");

const updateBeaconPerson = async ({
  idPerson,
  idBeacon,
  isActive,
  UpdatedBy,
}) => {
  return Person.update(
    {
      idBeacon,
      isActive,
      UpdatedBy,
    },
    {
      where: {
        idPerson,
      },
    }
  );
};

const updateEmployee = async ({
  idEmployee,
  name,
  firstLastName,
  secondLastName,
  email,
  idFacility,
  idBeacon,
  internalId,
  isActive,
  idPrivilegeLevel,
  UpdatedBy,
}) => {
  const updatedEmployee = await Employee.update(
    {
      internalId,
      isActive,
      UpdatedBy,
    },
    {
      where: {
        idEmployee,
      },
      returning: true,
    }
  );
  if (!updatedEmployee[1][0]) throw "Employee does not exist";
  await Person.update(
    {
      name,
      firstLastName,
      secondLastName,
      email,
      idFacility,
      idBeacon,
      idPrivilegeLevel,
      isActive,
      UpdatedBy,
    },
    {
      where: {
        idPerson: updatedEmployee[1][0].idPerson,
      },
    }
  );
};

module.exports = {
  updateBeaconPerson,
  updateEmployee,
};
