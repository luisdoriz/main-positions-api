const { AreaAccess } = require("../../models");
const { createAreaAccess } = require("./create");

const updateOrCreateAreaAccess = async ({
  idArea,
  UpdatedBy,
  idPrivilegeLevel,
}) =>
  AreaAccess.findOne({
    where: {
      idPrivilegeLevel,
      idArea,
    },
    paranoid: false,
  }).then(async (result) => {
    if (result) {
      result.setDataValue("deletedAt", null);
      result.setDataValue("UpdatedBy", UpdatedBy);
      return result.save({ paranoid: false });
    }
    return createAreaAccess({
      idArea,
      idPrivilegeLevel,
      allowed: 1,
      isActive: 1,
      CreatedBy: UpdatedBy,
      UpdatedBy,
    });
  });

module.exports = {
  updateOrCreateAreaAccess,
};
