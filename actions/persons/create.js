const { Employee, Visitor, Person } = require('../../models');

const createEmployee = async ({ name, firstLastName, secondLastName, email, idFacility, idBeacon, internalId, isActive, CreatedBy, UpdatedBy }) => {
    const person = await Person.create({
        name, firstLastName, secondLastName, email, idFacility, idBeacon, isActive, CreatedBy, UpdatedBy
    })
    await Employee.create({
        idPerson: person.idPerson, internalId, isActive, CreatedBy, UpdatedBy
    })
};

const createVisitor = async ({ name, firstLastName, secondLastName, email, idFacility, idBeacon, expirationDate, isActive, CreatedBy, UpdatedBy }) => {
    const person = await Person.create({
        name, firstLastName, secondLastName, email, idFacility, idBeacon, isActive, CreatedBy, UpdatedBy
    })
    await Visitor.create({
        idPerson: person.idPerson, expirationDate, isActive, CreatedBy, UpdatedBy
    })
};

module.exports = {
    createEmployee,
    createVisitor
};