const { Role } = require('../../models');

const readRoles = async () => {
    return Role.findAll({
        where: {
            isActive: 1
        }
    });
}

module.exports = {
    readRoles
};