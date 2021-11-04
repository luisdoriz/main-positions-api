const { AreaAccess } = require("../../models");

const createAreaAccess = async ({
  idArea,
  idPrivilegeLevel,
  allowed,
  isActive,
  CreatedBy,
  UpdatedBy,
}) =>
  AreaAccess.create({
    idArea,
    idPrivilegeLevel,
    allowed,
    isActive,
    CreatedBy,
    UpdatedBy,
  });

module.exports = {
  createAreaAccess,
};
