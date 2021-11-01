const models = require('../../models');

const { Facility } = models;

const readFacilities = async () => {
    return Facility.findAll({
        where: {
            isActive: 1
        }
    });
}

const readFacilityByIdOrganization = async ({ idOrganization }) => {
    return Facility.findAll({
        where: {
            idOrganization,
            isActive: 1
        }
    });
}

module.exports = {
    readFacilities,
    readFacilityByIdOrganization
};