const { Organization } = require('../../models');

const createOrganization = async({ name, address, phoneNumber }) => {
    const org = await Organization.findOne({ where: { name } })
    if(org) throw 'Ya existe una organización con ese nombre'
    await Organization.create({
        name,
        address,
        phoneNumber,
        isActive: 1,
        CreatedBy: 1,
        CreationDate: new Date(),
        UpdatedBy: 1,
        UpdatedDate: new Date()

    });
    return
}

module.exports = {
    createOrganization
}
