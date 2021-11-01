const { Employee, Person, Visitor } = require('../../models');
const { readEmployee, readVisitor } = require('./read')

const deleteEmployee = async ({ idEmployee }) => {
    const emp = await readEmployee({ idEmployee })
    await Employee.destroy({
        where: {
            idEmployee
        }
    });
    await Person.destroy({
        where: {
            idPerson: emp.idPerson
        }
    });
}

const deleteVisitor = async ({ idVisitor }) => {
    const vis = await readVisitor({ idVisitor })
    await Visitor.destroy({
        where: {
            idVisitor
        }
    });
    await Person.destroy({
        where: {
            idPerson: vis.idPerson
        }
    });
}

module.exports = {
    deleteEmployee,
    deleteVisitor
}