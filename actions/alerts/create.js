const moment = require("moment");
const { Op } = require("sequelize");

const { Alert } = require('../../models');
const { emitNotification } = require("../../modules/cron");
const { getPersonOrganization } = require("../persons");

const createAlert = async ({ payload, idArea, idPerson, date, idAlertType, }) => {
    let prevAlerts = []
    if (idAlertType == 3) {
        //capacidad excedida, check alerts from area in past 30 min
        prevAlerts = await Alert.findAll({
            where: {
                idAlertType,
                idArea,
                date: {
                    //only get rows from past 30 minutes
                    [Op.gte]: moment(date, "YYYY-MM-DD HH:mm:ss.SSS").subtract(30, "minutes").toDate(),
                },
            },
            raw: true
        })
    } else if (idAlertType == 5) {
        //area restringida, check past 30 minutes and alerts from same person
        prevAlerts = await Alert.findAll({
            where: {
                idAlertType,
                idArea,
                idPerson,
                date: {
                    //only get rows from past 30 minutes
                    [Op.gte]: moment(date, "YYYY-MM-DD HH:mm:ss.SSS").subtract(30, "minutes").toDate(),
                },
            },
            raw: true
        })
    } else {
        //check all day for prevous alerts for person
        prevAlerts = await Alert.findAll({
            where: {
                idAlertType,
                idArea,
                idPerson,
                date: {
                    //only get rows from this working day.
                    [Op.gte]: moment(date, "YYYY-MM-DD HH:mm:ss.SSS").subtract(12, "hours").toDate(),
                },
            },
            raw: true
        })
    }
    if (prevAlerts.length == 0) { //if no prevous alerts found, create new alert
        console.log('alert was created', idAlertType, payload)
        const idOrganization = await getPersonOrganization(idPerson)
        if (idOrganization !== null) {
            await emitNotification(idOrganization, payload)
        }
        return Alert.create({
            payload, idArea, idPerson, date, idAlertType, isActive: 1
        });
    } else {
        console.log('alert was not created because it already exists today', idAlertType, payload)
    }
}

module.exports = {
    createAlert
};