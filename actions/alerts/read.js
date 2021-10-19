const { sequelize, Alert, Person, Employee } = require('../../models');

const readAlerts = async () => {
    let [alerts] = await sequelize.query(`
    SELECT * FROM "Alert"
    JOIN "Person" ON "Person"."idPerson"="Alert"."idPerson"
    JOIN "Employee" ON "Employee"."idPerson"="Person"."idPerson"
    WHERE "Alert"."isActive"=1 AND "Employee"."isActive"=1 and "Person"."isActive"=1
    `)
    const formatedAlerts = []
    alerts.forEach(a => formatedAlerts.push({
        idAlert: a.idAlert,
        payload: a.payload,
        date: a.date,
        idEmployee: a.idEmployee,
        employeeName: `${a.name} ${a.firstLastName} ${a.secondLastName}`
    }))
    return formatedAlerts
}

module.exports = {
    readAlerts
};