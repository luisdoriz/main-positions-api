const { sequelize, Alert, Person, Employee } = require('../../models');

const readAlerts = async () => {
    let [alerts] = await sequelize.query(`
    SELECT "idAlert", "payload", "date", "idEmployee", "Person"."name", "Person"."firstLastName", "Person"."secondLastName", "Alert"."idArea", "Area"."name" as "areaName", "Facility"."idFacility", "Facility"."name" as "facilityName", "AlertType"."name" as "alertType" FROM "Alert"
    JOIN "AlertType" ON "AlertType"."idAlertType"="Alert"."idAlertType"
    JOIN "Person" ON "Person"."idPerson"="Alert"."idPerson"
    JOIN "Employee" ON "Employee"."idPerson"="Person"."idPerson"
    JOIN "Area" ON "Area"."idArea"="Alert"."idArea"
    JOIN "Facility" ON "Facility"."idFacility"="Area"."idFacility"
    WHERE "Alert"."isActive"=1 AND "Employee"."isActive"=1 and "Person"."isActive"=1 AND "Person"."deletedAt" IS NULL
    `)
    const formatedAlerts = []
    alerts.forEach(a => formatedAlerts.push({
        idAlert: a.idAlert,
        payload: a.payload,
        type: a.alertType,
        date: a.date,
        idEmployee: a.idEmployee,
        employeeName: `${a.name} ${a.firstLastName} ${a.secondLastName}`,
        idArea: a.idArea,
        areaName: a.areaName,
        idFacility: a.idFacilty,
        facilityName: a.facilityName
    }))
    return formatedAlerts
}

module.exports = {
    readAlerts
};