const models = require("../../models");
const { Op } = require("sequelize");
const { Organization } = models;

const readOrganizations = async () => {
    return Organization.findAll({
        where: {
            idOrganization: {
                [Op.ne]: 0
            },
            isActive: 1,
        },
    });
};

module.exports = {
    readOrganizations
};
