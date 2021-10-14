const models = require('../../models');

const { Sequelize, Employee, Person, Facility } = models;

const readEmployee = async ({ idEmployee }) => {
    return Employee.findOne({
        include: [{
            model: Person
        }],
        where: {
            isActive: 1,
            idEmployee
        }
    });
}

const readEmployees = async () => {
    //reads all employees grouped by facility
    const employees = await Employee.findAll({
        raw: true,
        attributes: [
            [Sequelize.col('Employee.idEmployee'), 'idEmployee'],
            [Sequelize.col('Person.name'), 'personName'],
            [Sequelize.col('Person.firstLastName'), 'firstLastName'],
            [Sequelize.col('Person.secondLastName'), 'secondLastName'],
            [Sequelize.col('Person.Facility.idFacility'), 'idFacility'],
            [Sequelize.col('Person.Facility.name'), 'facilityName'],
        ],
        include: [{
            model: Person,
            attributes: [],
            include: {
                model: Facility,
                attributes: [],
            }
        }],
        where: {
            isActive: 1
        },
        order: [
            [Sequelize.literal('"idFacility"'), 'ASC']
        ],
    })
    //get unique facilities
    const facilities = []
    employees.forEach(employee => {
        if (!facilities.find(f => f.idFacility === employee.idFacility)) {
            facilities.push({
                facilityName: employee.facilityName,
                idFacility: employee.idFacility,
                employees: []
            })
        }
    })
    //add employees to their facility
    facilities.forEach(facility => {
        const facilityEmployees = []
        employees.forEach(employee => {
            if (employee.idFacility === facility.idFacility) {
                facilityEmployees.push({
                    name: `${employee.personName} ${employee.firstLastName} ${employee.secondLastName}`,
                    idEmployee: employee.idEmployee
                })
            }
        })
        facility.employees = facilityEmployees
    })
    return facilities
}

module.exports = {
    readEmployee,
    readEmployees
};