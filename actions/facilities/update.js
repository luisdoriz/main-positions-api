const { Facility } = require('../../models');

const updateFacility = async ({ idFacility, name, timeLimit, maxCapacity, isActive, UpdatedBy }) => {
    return Facility.update({
        name, timeLimit, maxCapacity, isActive, UpdatedBy
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