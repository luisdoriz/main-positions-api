const models = require("../../models");

const { sequelize, Case, Person, Facility } = models;

const readActiveCases = async () => {
  const cases = await Case.findAll({
    include: {
      model: Person,
      include: {
        model: Facility,
      },
    },
    where: {
      ongoing: true,
    },
  });
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
const readRecoveredCases = async () => {
  const cases = await Case.findAll({
    include: {
      model: Person,
      include: {
        model: Facility,
      },
    },
    where: {
      ongoing: false,
    },
  });
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

const readAtRiskPersons = async (idCase) => {
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
    WHERE (("CasePosition"."from" BETWEEN "Case"."from"
            AND "Case"."to")
        OR("CasePosition"."to" BETWEEN "Case"."from"
            AND "Case"."to"))
    AND(("RiskPosition"."from" BETWEEN "Case"."from"
        AND "Case"."to")
        OR("RiskPosition"."to" BETWEEN "Case"."from"
            AND "Case"."to"))
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
