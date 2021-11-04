const { PrivilegeLevel } = require("../../models");
const { deleteAllAreaAccessFromIdPrivilegeLevel } = require("../areaAccess");

const deletePrivilegeLevel = async ({ idPrivilegeLevel }) =>
  PrivilegeLevel.destroy({
    where: {
      idPrivilegeLevel,
    },
  }).then(async (result) => {
    return deleteAllAreaAccessFromIdPrivilegeLevel(idPrivilegeLevel);
  });

module.exports = {
  deletePrivilegeLevel,
};
