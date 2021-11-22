const { PrivilegeLevel, AreaAccess, Area, Facility } = require("../../models");

const readPrivilegeLevels = async (where = {}, idOrganization) => {
  return PrivilegeLevel.findAll({
    include: [
      {
        model: AreaAccess,
        flat: true,
        include: [
          {
            model: Area,
            required: true,
            include: {
              model: Facility,
              required: true,
              attributes: [],
              where: { idOrganization }
            }
          },
        ],
      },
    ],
    where: {
      isActive: 1,
      ...where,
    },
  }).then((result) => {
    if(!result) return []
    result.map((resultItem) => {
      newBody = resultItem.dataValues;
      const areas = newBody.AreaAccesses.map(
        (areaAccessItem) => areaAccessItem.dataValues.Area.dataValues
      );
      newBody.areas = areas;
      delete newBody.AreaAccesses;
      return newBody;
    })
  }
    
  );
};

module.exports = {
  readPrivilegeLevels,
};
