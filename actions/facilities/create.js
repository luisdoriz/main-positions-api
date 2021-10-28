const { Facility } = require('../../models');

const createFacility = async ({ name, sizeX, sizeY, idOrganization, isActive, CreatedBy, UpdatedBy }) => Facility.create({
    name, sizeX, sizeY, idOrganization, isActive, CreatedBy, UpdatedBy
});

module.exports = {
    createFacility
};