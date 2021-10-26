const models = require('../../models');

const { sequelize, Gateway, Area } = models;

const readGateways = async ({ macAddress }) => {
    //get gatewasy from beacon mac's organization
    const gateways = await Gateway.findAll({
        include: [{
            model: Area
        }],
        where: {
            isActive: 1
        }
    });
    //const beacon = await Beacon.findOne({ where: { macAddress } })
    const [beacons] = await sequelize.query(`
            SELECT
            "b".*
        FROM
            "Beacon"
            INNER JOIN "Person" ON "Person"."idBeacon" = "Beacon"."idBeacon"
            INNER JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
            INNER JOIN "Person" "p" ON "p"."idFacility" = "Facility"."idFacility"
            INNER JOIN "Beacon" "b" ON "b"."idBeacon" = "p"."idBeacon"
        WHERE
            "Beacon"."macAddress" = :macAddress
    `, {
        replacements: {
            macAddress
        }
    })
    return {
        gateways,
        beacons
    }
}

module.exports = {
    readGateways
};