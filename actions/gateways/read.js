const models = require('../../models');

const { sequelize, Gateway, Area } = models;

const readGateways = async ({ macAddress }) => {
    //get gatewasy from beacon mac's organization

    //get beacons in a facility (used for flask cache)
    const [beacons] = await sequelize.query(`
            SELECT DISTINCT
            "b".*, "Facility"."idFacility"
        FROM
            "Beacon"
            INNER JOIN "Person" ON "Person"."idBeacon" = "Beacon"."idBeacon"
            INNER JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
            INNER JOIN "Person" "p" ON "p"."idFacility" = "Facility"."idFacility"
            INNER JOIN "Beacon" "b" ON "b"."idBeacon" = "p"."idBeacon"
        WHERE
            "Beacon"."macAddress" = :macAddress
            AND "b"."deletedAt" IS NULL
    `, {
        replacements: {
            macAddress
        }
    })

    if(!beacons[0]) throw "Beacon's mac address not found"
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