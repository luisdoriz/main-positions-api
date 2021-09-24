
const { Person } = require('../../models');

const updateBeaconEmployeePerson = async ({ idPerson, idBeacon, isActive, UpdatedBy }) => {
    return Person.update({
        idBeacon, isActive, UpdatedBy
    }, {
        where: {
            idPerson
        }
    });
}

module.exports = {
    updateBeaconEmployeePerson,
}