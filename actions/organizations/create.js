const { Organization } = require('../../models');

const createOrganization = ({ name, address, phoneNumber }) => {
    return Organization.create({
        name,
        address,
        phoneNumber,
        IsActive: true,
        CreatedBy: 1,
        CreationDate: new Date(),
        UpdatedBy: 1,
        UpdatedDate: new Date()

    });
}

module.exports = {
    createOrganization
}
