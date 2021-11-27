const moment = require("moment");
const { Op } = require("sequelize");
const { sequelize, Position } = require("../../models");

const readPositionsPerson24h = async ({ idPerson, area, from, to }) => {
  return Position.findAll({
    where: {
      idPerson,
      from: {
        //only get rows from past 24 hours
        [Op.gte]: moment(to, "YYYY-MM-DD HH:mm:ss.SSS").subtract(24, "hours").toDate(),
      },
    },
    order: [["from", "ASC"]],
    raw: true,
  });
};

const readPersonsPositionsArea = async ({ area, to }) => {
  return Position.count({
    where: {
      idArea: area,
      to: {
        //only get rows from past 5 minutes. if exist edit their "to" else create new position row
        [Op.gte]: moment(to, "YYYY-MM-DD HH:mm:ss.SSS").subtract(5, "minutes").toDate(),
      },
    },
    distinct: true,
    col: "idPerson",
    raw: true,
  });
};

const getActualPositions = async (idFacility) => {
  let [positions] = await sequelize.query(
    `
    SELECT DISTINCT ON ("Person"."idPerson")
        "Position"."idPosition" AS "idPosition",
        "Position"."x" AS "x",
        "Position"."y" AS "y",
        "Position"."from" AS "from",
        "Position"."to" AS "to",
        "Position"."idArea" AS "idArea",
        "Position"."isActive" AS "isActive",
        "Position"."CreationDate" AS "CreationDate",
        "Person"."idPerson" AS "idPerson",
        "Person"."name" AS "name",
        "Person"."firstLastName" AS "firstLastName",
        "Person"."secondLastName" AS "secondLastName",
        "Person"."email" AS "email"
    FROM
        "Position"
        LEFT JOIN "Person" ON "Person"."idPerson" = "Position"."idPerson"
        LEFT JOIN "Facility" ON "Person"."idFacility" = "Facility"."idFacility"
    WHERE 
      ("Position"."CreationDate" >= date_trunc('minute', CAST((CAST(now() AS timestamp) + (INTERVAL '-5 minute')) AS timestamp))
      AND "Position"."CreationDate" < date_trunc('minute', CAST(now() AS timestamp)))
      OR("Position"."to" >= date_trunc('minute', CAST((CAST(now() AS timestamp) + (INTERVAL '-5 minute')) AS timestamp))
      AND "Position"."to" < date_trunc('minute', CAST(now() AS timestamp)))
      AND "Person"."idFacility" = :idFacility
    ORDER BY
        "Person"."idPerson",
        "Position"."to" DESC,
        "Position"."CreationDate" DESC     
    `,
    {
      replacements: { idFacility },
    }
  );
  return positions;
};

module.exports = {
  readPositionsPerson24h,
  readPersonsPositionsArea,
  getActualPositions,
};
