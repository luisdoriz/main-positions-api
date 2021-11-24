const models = require('../../models');

const { sequelize, Beacon, Gateway, Area } = models;

const readGateways = async ({ macAddress }) => {
    //get gatewasy from beacon mac's organization

    //get beacons in a facility (used for flask cache)
    const beacon = await Beacon.findOne({ where: { macAddress: macAddress.toUpperCase() } })
    const [beacons] = await sequelize.query(`
            SELECT DISTINCT
            "Beacon".*
        FROM
            "Beacon"
        WHERE
            "Beacon"."idFacility" = :idFacility
            AND "Beacon"."deletedAt" IS NULL
    `, {
        replacements: {
            idFacility: beacon.idFacility
        }
    })

    if (!beacons[0]) throw "Beacon's mac address not found"
    const idFacility = beacons[0].idFacility
    //get gateways from the beacons idFacility
    const [gateways] = await sequelize.query(`
        SELECT * FROM "Gateway" 
        JOIN "Area" USING("idArea")
        WHERE "Gateway"."idArea" IN
            (SELECT "idArea" FROM "Facility" 
            JOIN "Area" USING("idFacility")
            WHERE "Facility"."idFacility"=:idFacility) /*idAreas in a facility*/
        AND
            "Gateway"."deletedAt" IS NULL
    `, {
        replacements: {
            idFacility
        }
    })
    return {
        gateways,
        beacons
    }
}

const readGatewaysByIdFacility = async ({ idFacility, idOrganization }) => {
    //get gateways in a facility
    const [gateways] = await sequelize.query(`
        SELECT * FROM "Gateway" 
        LEFT JOIN "Area" USING("idArea")
        WHERE "Gateway"."idArea" IN
            (SELECT "idArea" FROM "Facility" 
            JOIN "Area" USING("idFacility")
            WHERE "Facility"."idFacility"=:idFacility AND "Facility"."idOrganization"=:idOrganization) /*idAreas in a facility*/
        AND
            "Gateway"."deletedAt" IS NULL
    `, {
        replacements: {
            idFacility,
            idOrganization
        }
    })
    return gateways
}

module.exports = {
    readGateways,
    readGatewaysByIdFacility
};