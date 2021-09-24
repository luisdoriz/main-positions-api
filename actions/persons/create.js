const { Employee, Person } = require('../../models');

const createEmployee = async ({ name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive, CreatedBy, UpdatedBy }) => {
    const person = await Person.create({
        name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive, CreatedBy, UpdatedBy
    })
    console.log(person)
    await Employee.create({
        idPerson: person.idPerson, internalId, isActive, CreatedBy, UpdatedBy
    })
};

module.exports = {
    createEmployee
};