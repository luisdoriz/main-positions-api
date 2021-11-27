const { Role, User } = require('../../models');
const { Op } = require('sequelize')

const readRoles = async () => {
    return Role.findAll({
        where: {
            "idRole": { [Op.gt]: 2 },
            isActive: 1,
        },
        include: {
            attributes: [],
            model: User,
        }
    });
}

module.exports = {
    readRoles
};