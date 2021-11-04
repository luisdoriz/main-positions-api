const { PrivilegeLevel } = require("../../models");
const { createAreaAccess } = require("../areaAccess");

const updatePrivilegeLevel = async ({
  idPrivilegeLevel,
  name,
  idFacility,
  isActive,
  UpdatedBy,
  areas,
}) =>
  PrivilegeLevel.update(
    {
      name,
      idFacility,
      isActive,
      UpdatedBy,
    },
    {
      where: {
        idPrivilegeLevel,
      },
    }
  ).then(async (result) => {
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
  updatePrivilegeLevel,
};
