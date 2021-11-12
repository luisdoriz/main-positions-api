const models = require("../../models");

const { Facility, Area, sequelize } = models;

const readFacilities = async () => {
  return Facility.findAll({
    where: {
      isActive: 1,
    },
  });
};

const readFacilityByIdArea = async (idArea) => {
  return Facility.findOne({
    where: {
      isActive: 1,
    },
    include: {
      model: Area,
      attributes: [],
      where: {
        idArea
      }
    }
  });
};

const readFacilityByIdOrganization = async ({ idOrganization }) => {
  return Facility.findAll({
    where: {
      idOrganization,
      isActive: 1,
    },
  });
};

const getAreaTraffic = async (query) =>
  sequelize.query(
    `
        SELECT
            "Area"."idArea",
            "Area"."name",
            count(*) AS "count"
        FROM
            "Position"
            LEFT JOIN "Area" "Area" ON "Position"."idArea" = "Area"."idArea"
            LEFT JOIN "Facility" "Facility" ON "Area"."idFacility" = "Facility"."idFacility"
        WHERE ("Area"."idFacility" = :idFacility
            AND "Position"."CreationDate" >= timestamp WITH time zone :fromDate
            AND "Position"."CreationDate" < timestamp WITH time zone :toDate
        )
        GROUP BY
            "Area"."idArea"
        ORDER BY
            "Area"."idArea" ASC
          `,
    {
      replacements: query,
    }
  );

const getOcurrenciesPerArea = async (query) =>
  sequelize.query(
    `
        SELECT
            "Person"."idPerson",
            "Person"."name" as "personName",
            "Person"."firstLastName",
            "Person"."secondLastName",
            "Area"."idArea",
            "Area"."name",
            count(*) AS "count"
        FROM
            "Position"
            LEFT JOIN "Person" ON "Position"."idPerson" = "Person"."idPerson"
            LEFT JOIN "Area" ON "Position"."idArea" = "Area"."idArea"
        WHERE ("Area"."idFacility" = :idFacility
            AND "Position"."CreationDate" >= timestamp WITH time zone :fromDate
            AND "Position"."CreationDate" < timestamp WITH time zone :toDate
        )
        GROUP BY
            "Person"."idPerson",
            "Area"."idArea"
        ORDER BY
            "Person"."idPerson" ASC,
            "Area"."idArea" ASC
    `,
    {
      replacements: query,
    }
  );

const getCheckIn = async (query) =>
  sequelize.query(
    `
    SELECT DISTINCT ON ("results"."idPerson")
        *
    FROM (
        SELECT
            "Position"."idPerson",
            "Person"."name",
            "Person"."firstLastName",
            "Person"."secondLastName",
            "Area"."name",
            "Position"."CreationDate"
        FROM
            "Position"
        LEFT JOIN "Person" ON "Person"."idPerson" = "Position"."idPerson"
        LEFT JOIN "Area" ON "Area"."idArea" = "Position"."idArea"
        LEFT JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
    WHERE ("Area"."idFacility" = :idFacility
        AND "Position"."CreationDate" >= timestamp WITH time zone :fromDate
        AND "Position"."CreationDate" < timestamp WITH time zone :toDate
    )
    ORDER BY
        "Position"."CreationDate" DESC
    ) AS "results"
                
    `,
    {
      replacements: query,
    }
  );

module.exports = {
  readFacilities,
  readFacilityByIdArea,
  readFacilityByIdOrganization,
  getAreaTraffic,
  getOcurrenciesPerArea,
  getCheckIn,
};
