const models = require("../../models");

const { Organization } = models;

const readOrganizations = async () => {
  return Organization.findAll({
    where: {
      isActive: 1,
    },
  });
};

module.exports = {
    readOrganizations
};
