const { Organization } = require('../../models');

const updateOrganization = async ({ idOrganization, name, address, phoneNumber, isActive, UpdatedBy }) => {
    return Organization.update({
        name, address, phoneNumber, isActive, UpdatedBy
    }, {
        where: {
            idOrganization
        },
        returning: true
    });
}

module.exports = {
    updateOrganization
}