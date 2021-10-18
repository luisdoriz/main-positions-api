const models = require('../../models');

const { Case, Person, Facility } = models;

const readActiveCases = async () => {
    const cases = await Case.findAll({
        include: {
            model: Person,
            include: {
                model: Facility,
            }
        },
        where: {
            ongoing: true
        }
    });
    const formatedCases = []
    cases.forEach(c => formatedCases.push({
        name: `${c.Person.name} ${c.Person.firstLastName} ${c.Person.secondLastName}`,
        date: c.from,
        idFacility: c.Person.Facility.idFacility,
        facilityName:  c.Person.Facility.name
    }))
    return formatedCases
}
const readRecoveredCases = async () => {
    const cases = await Case.findAll({
        include: {
            model: Person,
            include: {
                model: Facility,
            }
        },
        where: {
            ongoing: false
        }
    });
    const formatedCases = []
    cases.forEach(c => formatedCases.push({
        name: `${c.Person.name} ${c.Person.firstLastName} ${c.Person.secondLastName}`,
        date: c.from,
        idFacility: c.Person.Facility.idFacility,
        facilityName:  c.Person.Facility.name
    }))
    return formatedCases
}

module.exports = {
    readActiveCases,
    readRecoveredCases
};