
const { Person } = require('../../models');

const updateBeaconPerson = async ({ idPerson, idBeacon, isActive, UpdatedBy }) => {
    return Person.update({
        idBeacon, isActive, UpdatedBy
    }, {
        where: {
            idPerson
        }
    });
}

module.exports = {
    updateBeaconPerson,
}