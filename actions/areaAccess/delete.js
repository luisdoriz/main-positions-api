const { AreaAccess } = require("../../models");

const deleteAllAreaAccessFromIdPrivilegeLevel = async (idPrivilegeLevel) =>
AreaAccess.destroy(
    {
      where: {
        idPrivilegeLevel,
      },
    }
  )

module.exports = {
  deleteAllAreaAccessFromIdPrivilegeLevel,
};
