const { Organization, Users } = require('../../models');
const { deleteFacility, readFacilityByIdOrganization } = require('../facilities')

const deleteOrganization = async ({ idOrganization }) => {
    const facilities = await readFacilityByIdOrganization({ idOrganization })
    await Organization.destroy({
        where: {
            idOrganization
        }
    });
    await Users.destroy({
        where: {
            idOrganization
        }
    });
    for(let facility of facilities) await deleteFacility({idFacility: facility.idFacility})
}

module.exports = {
    deleteOrganization,
}