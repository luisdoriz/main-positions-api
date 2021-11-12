const { Alert } = require('../../models');

const createAlert = async ({ payload, idArea, idPerson, date, idAlertType, }) => {
    return Alert.create({
        payload, idArea, idPerson, date, idAlertType, isActive: 1
    });
}

module.exports = {
    createAlert
};