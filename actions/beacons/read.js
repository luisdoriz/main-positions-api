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

const readBeaconsAvailable = async ({ idOrganization }) => {
    let [beacons] = await sequelize.query(`
    SELECT * FROM "Beacon" 
    JOIN "Facility" USING("idFacility")
    JOIN "Organization" USING("idOrganization")
    WHERE "Organization"."idOrganization" = :idOrganization
    AND
        "Beacon"."idBeacon" NOT IN
            (SELECT "idBeacon" FROM "Person" WHERE "Person"."isActive" = 1) /*Beacons assigned to a person*/
    AND
        "Beacon"."deletedAt" IS NULL
    `, {
        replacements: { idOrganization }
    })
    return beacons
}
module.exports = {
    readBeaconByMac,
    readBeacons,
    readBeaconsAvailable
}