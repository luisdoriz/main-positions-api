const { sequelize, PrivilegeLevel, AreaAccess, Area, Facility } = require("../../models");

const readPrivilegeLevels = async (where = {}, idOrganization) => {
  let allowedIds = await PrivilegeLevel.findAll({
    attributes: [sequelize.fn('DISTINCT','idPrivilegeLevel'), 'idPrivilegeLevel'],
    include: {
      model: AreaAccess,
      attributes: [],
      required: true,
      include: {
        attributes: [],
        model: Area,
        required: true,
        include: {
          attributes: [],
          model: Facility,
          required: true,
          where: { idOrganization }
        }
      }
    },
    raw: true
  })
  allowedIds = allowedIds.map(e => e.idPrivilegeLevel)
  console.log(allowedIds)
  return PrivilegeLevel.findAll({
    include: [
      {
        model: AreaAccess,
        flat: true,
        include: [
          {
            model: Area,
          },
        ],
      },
    ],
    where: {
      isActive: 1,
      ...where,
      idPrivilegeLevel: allowedIds
    },
  }).then((result) =>
    result.map((resultItem) => {
      newBody = resultItem.dataValues;
      const areas = newBody.AreaAccesses.map(
        (areaAccessItem) => areaAccessItem.dataValues.Area.dataValues
      );
      newBody.areas = areas;
      delete newBody.AreaAccesses;
      return newBody;
    })
  );
};

module.exports = {
  readPrivilegeLevels,
};
