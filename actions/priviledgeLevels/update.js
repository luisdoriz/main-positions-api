const { PrivilegeLevel } = require("../../models");
const {
  deleteAllAreaAccessFromIdPrivilegeLevel,
  updateOrCreateAreaAccess,
} = require("../areaAccess");

const updatePrivilegeLevel = async ({
  idPrivilegeLevel,
  name,
  idFacility,
  isActive,
  UpdatedBy,
  areas,
  entryTime
}) =>
  PrivilegeLevel.update(
    {
      name,
      entryTime,
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
    await deleteAllAreaAccessFromIdPrivilegeLevel(idPrivilegeLevel);
    areas_promises = areas.map(async (idArea) =>
      updateOrCreateAreaAccess({
        idArea,
        idPrivilegeLevel: idPrivilegeLevel,
        UpdatedBy,
      })
    );
    await Promise.all(areas_promises);
    return result;
  });

module.exports = {
  updatePrivilegeLevel,
};
