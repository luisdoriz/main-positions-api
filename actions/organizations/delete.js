const { Organization } = require('../../models');

const deleteOrganization = async ({ idOrganization }) => {
    await Organization.destroy({
        where: {
            idOrganization
        }
    });
}

module.exports = {
    deleteOrganization,
}