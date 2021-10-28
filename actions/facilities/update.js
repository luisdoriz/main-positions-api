const { Facility } = require('../../models');

const updateFacility = async ({ idFacility, name, sizeX, sizeY, isActive, UpdatedBy }) => {
    return Facility.update({
        name, sizeX, sizeY, isActive, UpdatedBy
    }, {
        where: {
            idFacility
        },
        returning: true
    });
}

module.exports = {
    updateFacility
}