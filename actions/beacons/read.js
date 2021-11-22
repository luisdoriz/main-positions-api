const { Sequelize, sequelize, Beacon, Facility } = require("../../models");

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

const readBeaconsAvailable = async ({ idOrganization }) => {
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
};
module.exports = {
  readBeaconByMac,
  readBeacons,
  readBeaconsAvailable,
};
