const { Sequelize, sequelize, Beacon } = require('../../models');

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

const readBeaconsAvailable = async () => {
    let [visitors] = await sequelize.query(`
    SELECT * FROM "Beacon" 
    WHERE "Beacon"."idBeacon" NOT IN
        (SELECT "idBeacon" FROM "Person" WHERE "Person"."isActive" = 1) /*idAreas in a facility*/
    AND
        "Beacon"."deletedAt" IS NULL
    `)
    return visitors
}
module.exports = {
    readBeaconByMac,
    readBeacons,
    readBeaconsAvailable
}