const { Sequelize, sequelize, Beacon, Facility } = require("../../models");

const readBeaconsMQTT = async () => {
  const beacons = await  Beacon.findAll({
    where: {
      isActive: 1,
    },
  });
  return beacons.map(b => b.macAddress.toUpperCase() )
};

const readBeaconByMac = async ({ macAddress }) => {
  return Beacon.findOne({
    where: {
      macAddress,
      isActive: 1,
    },
  });
};

const readBeacons = async ({ idOrganization }) => {
  return Beacon.findAll({
    where: {
      isActive: 1,
    },
    include: {
      model: Facility,
      where: { idOrganization }
    }
  });
};

const readBeaconsAvailable = async ({ idOrganization, idFacility }) => {
  if(idFacility) { //get beacons from facility
    let [beacons] = await sequelize.query(
      `
      SELECT
          "Beacon".*
      FROM
          "Beacon"
          JOIN "Facility" USING ("idFacility")
      WHERE
          "Facility"."idFacility" = :idFacility
          AND "Beacon"."idBeacon" NOT IN(
              SELECT
                  "idBeacon" FROM "Person"
              WHERE
                  "Person"."isActive" = 1
                  AND "Person"."deletedAt" IS NULL)
          /*Beacons assigned to a person*/
          AND "Beacon"."deletedAt" IS NULL
      ORDER BY
          "Beacon"."idBeacon"
      `,
      {
        replacements: { idFacility },
      }
    );
    return beacons;
  } else { //get beacons from organization
    let [beacons] = await sequelize.query(
      `
        SELECT
        "Beacon".*
    FROM
        "Beacon"
        JOIN "Facility" USING ("idFacility")
        JOIN "Organization" USING ("idOrganization")
    WHERE
        "Organization"."idOrganization" = :idOrganization
        AND "Beacon"."idBeacon" NOT IN(
            SELECT
                "idBeacon" FROM "Person"
            WHERE
                "Person"."isActive" = 1
                AND "Person"."deletedAt" IS NULL)
        /*Beacons assigned to a person*/
        AND "Beacon"."deletedAt" IS NULL
    ORDER BY
        "Beacon"."idBeacon"
      `,
      {
        replacements: { idOrganization },
      }
    );
    return beacons;
  }
};
module.exports = {
  readBeaconsMQTT,
  readBeaconByMac,
  readBeacons,
  readBeaconsAvailable,
};
