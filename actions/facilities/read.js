const models = require("../../models");

const { Facility, Area, sequelize, Sequelize } = models;

const readFacilities = async ({ idOrganization }) => {
  return Facility.findAll({
    where: {
      isActive: 1,
      idOrganization
    },
  });
};

const readFacilityByIdArea = async ({ idArea }) => {
  return Area.findOne({
    where: {
      isActive: 1,
      idArea,
    },
    attributes: [
      "idArea",
      [Sequelize.col("Facility.idFacility"), "idFacility"],
      [Sequelize.col("Facility.idOrganization"), "idOrganization"],
      [Sequelize.col("Facility.name"), "name"],
    ],
    include: {
      model: Facility,
      attributes: [],
    },
    raw: true,
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
      replacements: query
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
      replacements: query
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
            "Area"."name" as "areaName",
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
      replacements: query
    }
  );

const getCasesReport = async (query) =>
  sequelize.query(
    `
    SELECT
      (CAST(date_trunc('week', CAST((CAST("public"."Case"."CreationDate" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "CreationDate",
      count(*) AS "count"
    FROM
      "public"."Case"
      LEFT JOIN "Person" "Person" ON "Case"."idPerson" = "Person"."idPerson"
      LEFT JOIN "Facility" "Facility" ON "Person"."idFacility" = "Facility"."idFacility"
    WHERE ("Case"."deletedAt" IS NULL
      AND "Case"."isActive" = 1
      AND "Person"."deletedAt" IS NULL
      AND "Facility"."idFacility" = :idFacility
      AND "Case"."CreationDate" >= timestamp WITH time zone :fromDate
      AND "Case"."CreationDate" < timestamp WITH time zone :toDate
    )
    GROUP BY
      (
        CAST(
          date_trunc(
            'week',
            CAST((
                CAST(
                  "Case"."CreationDate" AS timestamp
    ) + (
                  INTERVAL '1 day'
    )
    ) AS timestamp
    )
    ) AS timestamp
    ) + (
          INTERVAL '-1 day'
    )
    )
    ORDER BY
      (
        CAST(
          date_trunc(
            'week',
            CAST((
                CAST(
                  "Case"."CreationDate" AS timestamp
    ) + (
                  INTERVAL '1 day'
    )
    ) AS timestamp
    )
    ) AS timestamp
    ) + (
          INTERVAL '-1 day'
    )
    ) ASC
    `,
    {
      replacements: query
    }
  );

const getCasesReportData = async (query) =>
  sequelize.query(
    `
    SELECT
      "Person"."idPerson",
      "Person"."name",
      "Person"."firstLastName",
      "Person"."secondLastName",
      "Case"."from" AS "from",
      "Case"."to" AS "to"
    FROM
      "Case"
      LEFT JOIN "Person" "Person" ON "Case"."idPerson" = "Person"."idPerson"
      LEFT JOIN "Facility" "Facility" ON "Person"."idFacility" = "Facility"."idFacility"
    WHERE ("Case"."deletedAt" IS NULL
      AND "Case"."isActive" = 1
      AND "Person"."deletedAt" IS NULL
      AND "Case"."CreationDate" >= timestamp WITH time zone :fromDate
      AND "Case"."CreationDate" < timestamp WITH time zone :toDate
      AND "Facility"."idFacility" = :idFacility
    )
    `,
    {
      replacements: query
    }
  );

module.exports = {
  readFacilities,
  readFacilityByIdArea,
  readFacilityByIdOrganization,
  getAreaTraffic,
  getOcurrenciesPerArea,
  getCheckIn,
  getCasesReport,
  getCasesReportData,
};
