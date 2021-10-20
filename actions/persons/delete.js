const { Employee, Person, Beacon } = require('../../models');
const { readEmployee } = require('./read')

const deleteEmployee = async ({ idEmployee }) => {
    const emp = await readEmployee({ idEmployee })
    await Employee.destroy({
        where: {
            idEmployee
        }
    });
    await Beacon.destroy({
        where: {
            idBeacon: emp.idBeacon
        }
    });
    await Person.destroy({
        where: {
            idPerson: emp.idPerson
        }
    });
}

module.exports = {
    deleteEmployee,
}