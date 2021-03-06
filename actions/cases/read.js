const models = require("../../models");

const { sequelize, Case, Person, Facility } = models;

const readActiveCases = async ({ idOrganization }) => {
  const cases = await Case.findAll({
    include: {
      model: Person,
      required: true,
      include: {
        model: Facility,
        required: true,
        where: { idOrganization }
      },
    },
    where: {
      ongoing: true,
    },
  });
  //if(!cases.Person) return []
  const formatedCases = [];
  cases.forEach((c) => {
    formatedCases.push({
      name: `${c.Person.name} ${c.Person.firstLastName} ${c.Person.secondLastName}`,
      date: c.from,
      idCase: c.idCase,
      idFacility: c.Person.Facility.idFacility,
      facilityName: c.Person.Facility.name,
    })
  }
  );
  return formatedCases;
};
const readRecoveredCases = async ({ idOrganization }) => {
  const cases = await Case.findAll({
    include: {
      model: Person,
      required: true,
      include: {
        model: Facility,
        required: true,
        where: { idOrganization }
      },
    },
    where: {
      ongoing: false,
    },
  });
  //if(!cases.Person) return []
  const formatedCases = [];
  cases.forEach((c) =>
    formatedCases.push({
      name: `${c.Person.name} ${c.Person.firstLastName} ${c.Person.secondLastName}`,
      date: c.from,
      idCase: c.idCase,
      idFacility: c.Person.Facility.idFacility,
      facilityName: c.Person.Facility.name,
    })
  );
  return formatedCases;
};

const readAtRiskPersons = async ({idCase}) => {
  let [atRisk] = await sequelize.query(
    `
    SELECT DISTINCT
      "RiskPerson"."idPerson",
      "RiskPerson"."name",
      "RiskPerson"."firstLastName",
      "RiskPerson"."secondLastName",
      "RiskPerson"."email"
    FROM
      "Case"
      LEFT JOIN "Position" AS "CasePosition" ON "Case"."idPerson" = "CasePosition"."idPerson"
      LEFT JOIN "Position" AS "RiskPosition" ON "CasePosition"."idArea" = "RiskPosition"."idArea"
      LEFT JOIN "Person" AS "RiskPerson" ON "RiskPerson"."idPerson" = "RiskPosition"."idPerson"
    WHERE ((("CasePosition"."from" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
          AND "Case"."to")
        OR("CasePosition"."from" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
      AND now()))
      OR(("CasePosition"."to" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND "Case"."to")
      OR("CasePosition"."to" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND now())))
    AND((("RiskPosition"."from" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND "Case"."to")
      OR("RiskPosition"."from" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND now()))
      OR(("RiskPosition"."to" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND "Case"."to")
      OR("RiskPosition"."to" BETWEEN(CAST(date_trunc('week', CAST((CAST((CAST("Case"."from" AS timestamp) + (INTERVAL '-1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
    AND now())))
    AND "RiskPosition"."idPerson" != "Case"."idPerson"
    AND "Case"."idCase" = :idCase
        `,
    {
      replacements: {
        idCase,
      },
    }
  );
  return atRisk;
};

module.exports = {
  readActiveCases,
  readRecoveredCases,
  readAtRiskPersons,
};
