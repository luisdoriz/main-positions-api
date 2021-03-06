const { PrivilegeLevel } = require("../../models");
const { createAreaAccess } = require("../areaAccess");

const createPrivilegeLevel = async ({
  name,
  idFacility,
  isActive,
  CreatedBy,
  UpdatedBy,
  areas,
  entryTime
}) =>
  PrivilegeLevel.create({
    name,
    entryTime,
    idFacility,
    isActive,
    CreatedBy,
    UpdatedBy,
  }).then(async (result) => {
    areas_promises = areas.map(async (idArea) =>
      createAreaAccess({
        idArea,
        idPrivilegeLevel: result.dataValues.idPrivilegeLevel,
        allowed: 1,
        isActive: 1,
        CreatedBy,
        UpdatedBy,
      })
    );
    await Promise.all(areas_promises);
    return result;
  });

module.exports = {
  createPrivilegeLevel,
};
