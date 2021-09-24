const { Sequelize, Beacon } = require('../../models');

const readBeaconByMac = async ({ macAddress }) => {
    return Beacon.findOne({
        where: {
            macAddress,
            isActive: 1
        }
    });
}

const readBeacons = async () => {
    return Beacon.findAll({
        where: {
            isActive: 1
        }
    });
}

module.exports = {
    readBeaconByMac,
    readBeacons
}