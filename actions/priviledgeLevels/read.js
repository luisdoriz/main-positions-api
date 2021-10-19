const { PrivilegeLevel } = require('../../models');

const readPrivilegeLevels = async () => {
    return PrivilegeLevel.findAll({
        where: {
            isActive: 1
        }
    });
}

module.exports = {
    readPrivilegeLevels
};