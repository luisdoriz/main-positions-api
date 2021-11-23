const models = require("../../models");

const { sequelize, Sequelize, Employee, Person, Facility, Beacon } = models;

const readEmployee = async ({ idEmployee }) => {
  let [employee] = await sequelize.query(
    `
    SELECT
        "Employee"."idEmployee",
        "Person"."name",
        CONCAT("Person"."firstLastName", ' ', "Person"."secondLastName") AS "lastNames",
        "Person"."email",
        "Beacon"."macAddress" AS "macAddress",
        "PrivilegeLevel"."name" AS "privilegeLevel",
        "PrivilegeLevel"."idPrivilegeLevel",
        "Facility"."idFacility",
        "Facility"."name" AS "facilityName",
        "Employee"."internalId",
        "Person"."idPerson",
        "Beacon"."idBeacon"
    FROM
        "Employee"
        JOIN "Person" ON "Person"."idPerson" = "Employee"."idPerson"
        JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
        LEFT JOIN "Beacon" ON "Beacon"."idBeacon" = "Person"."idBeacon"
        LEFT JOIN "PrivilegeLevel" ON "PrivilegeLevel"."idPrivilegeLevel" = "Person"."idPrivilegeLevel"
    WHERE
        "Employee"."idEmployee" = :idEmployee
        AND "Employee"."deletedAt" IS NULL
    `,
    {
      replacements: {
        idEmployee,
      },
    }
  );
  return employee[0];
};

const readEmployees = async ({ idOrganization }) => {
  let [employees] = await sequelize.query(
    `
    SELECT
        "Employee"."idEmployee",
        "Person"."name",
        CONCAT("Person"."firstLastName", ' ', "Person"."secondLastName") AS "lastNames",
        "Person"."email",
        "Beacon"."macAddress" AS "macAddress",
        "PrivilegeLevel"."name" AS "privilegeLevel",
        "PrivilegeLevel"."idPrivilegeLevel",
        "Facility"."idFacility",
        "Facility"."name" AS "facilityName",
        "Employee"."internalId",
        "Person"."idPerson",
        "Beacon"."idBeacon"
    FROM
        "Employee"
        JOIN "Person" ON "Person"."idPerson" = "Employee"."idPerson"
        JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
        LEFT JOIN "Beacon" ON "Beacon"."idBeacon" = "Person"."idBeacon"
        LEFT JOIN "PrivilegeLevel" ON "PrivilegeLevel"."idPrivilegeLevel" = "Person"."idPrivilegeLevel"
    WHERE
        "Facility"."idOrganization" = :idOrganization
        AND "Employee"."deletedAt" IS NULL
        AND "Person"."deletedAt" IS NULL
    `,
    {
      replacements: {
        idOrganization,
      },
    }
  );
  return employees;
};

const readVisitor = async ({ idVisitor }) => {
  let [visitors] = await sequelize.query(
    `
    SELECT
        "Visitor"."idVisitor",
        "Person"."name",
        CONCAT("Person"."firstLastName", ' ', "Person"."secondLastName") AS "lastNames",
        "Person"."email",
        "Beacon"."macAddress" AS "macAddress",
        "PrivilegeLevel"."name" AS "privilegeLevel",
        "PrivilegeLevel"."idPrivilegeLevel",
        "Facility"."idFacility",
        "Facility"."name" AS "facilityName",
        "Visitor"."expirationDate",
        "Person"."idPerson",
        "Beacon"."idBeacon"
    FROM
        "Visitor"
        JOIN "Person" ON "Person"."idPerson" = "Visitor"."idPerson"
        JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
        LEFT JOIN "Beacon" ON "Beacon"."idBeacon" = "Person"."idBeacon"
        LEFT JOIN "PrivilegeLevel" ON "PrivilegeLevel"."idPrivilegeLevel" = "Person"."idPrivilegeLevel"
    WHERE
        "Visitor"."idVisitor" = :idVisitor
        AND "Visitor"."deletedAt" IS NULL
    `,
    {
      replacements: {
        idVisitor,
      },
    }
  );
  return visitors[0];
};

const readVisitors = async ({ idOrganization, queryType }) => {
  let whereQuery = 'AND "Visitor"."isActive" = 0';
  if (queryType === "active") {
    whereQuery = 'AND "Visitor"."isActive" = 1';
  }
  let [visitors] = await sequelize.query(
    `
    SELECT
        "Visitor"."idVisitor",
        "Person"."name",
        "Person"."firstLastName",
        "Person"."secondLastName",
        "Person"."email",
        "Beacon"."macAddress" AS "macAddress",
        "PrivilegeLevel"."name" AS "privilegeLevel",
        "PrivilegeLevel"."idPrivilegeLevel",
        "Facility"."idFacility",
        "Facility"."name" AS "facilityName",
        "Visitor"."expirationDate",
        "Person"."idPerson",
        "Beacon"."idBeacon"
    FROM
        "Visitor"
        JOIN "Person" ON "Person"."idPerson" = "Visitor"."idPerson"
        JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
        LEFT JOIN "Beacon" ON "Beacon"."idBeacon" = "Person"."idBeacon"
        LEFT JOIN "PrivilegeLevel" ON "PrivilegeLevel"."idPrivilegeLevel" = "Person"."idPrivilegeLevel"
    WHERE
        "Facility"."idOrganization" = :idOrganization
        AND "Visitor"."deletedAt" IS NULL
        ${whereQuery}
    `,
    {
      replacements: {
        idOrganization,
      },
    }
  );
  return visitors;
};

const readEmployeesFacilities = async ({ idOrganization }) => {
  //reads all employees grouped by facility
  const employees = await Employee.findAll({
    raw: true,
    attributes: [
      [Sequelize.col("Employee.idEmployee"), "idEmployee"],
      [Sequelize.col("Person.name"), "personName"],
      [Sequelize.col("Person.firstLastName"), "firstLastName"],
      [Sequelize.col("Person.secondLastName"), "secondLastName"],
      [Sequelize.col("Person.Facility.idFacility"), "idFacility"],
      [Sequelize.col("Person.Facility.name"), "facilityName"],
    ],
    include: [
      {
        model: Person,
        attributes: [],
        include: {
          model: Facility,
          where: { idOrganization },
          attributes: [],
        },
      },
    ],
    where: {
      isActive: 1,
    },
    order: [[Sequelize.literal('"idFacility"'), "ASC"]],
  });
  //get unique facilities
  const facilities = [];
  employees.forEach((employee) => {
    if (!facilities.find((f) => f.idFacility === employee.idFacility)) {
      facilities.push({
        facilityName: employee.facilityName,
        idFacility: employee.idFacility,
        employees: [],
      });
    }
  });
  //add employees to their facility
  facilities.forEach((facility) => {
    const facilityEmployees = [];
    employees.forEach((employee) => {
      if (employee.idFacility === facility.idFacility) {
        facilityEmployees.push({
          name: `${employee.personName} ${employee.firstLastName} ${employee.secondLastName}`,
          idEmployee: employee.idEmployee,
        });
      }
    });
    facility.employees = facilityEmployees;
  });
  return facilities;
};

const readPersonByBeaconMac = (macAddress) => {
  return Person.findOne({
    include: {
      model: Beacon,
      where: {
        macAddress,
      },
    },
  });
};

const readPerson = (idPerson) => {
  return Person.findOne({
    where: { idPerson },
  });
};

const readLateCheckin = async () => {
  const [persons] = await sequelize.query(
    `
    SELECT DISTINCT ON ("results"."idPerson")
      *
    FROM (
      SELECT
        "Position"."idPerson",
        "Person"."name",
        "Person"."firstLastName",
        "Person"."secondLastName",
        "Position"."CreationDate",
        "Facility"."idOrganization"
    FROM
      "Position"
      LEFT JOIN "Person" ON "Person"."idPerson" = "Position"."idPerson"
      LEFT JOIN "PrivilegeLevel" ON "PrivilegeLevel"."idPrivilegeLevel" = "Person"."idPrivilegeLevel"
      LEFT JOIN "Facility" on "Facility"."idFacility" = "Person"."idFacility"
    WHERE ("Position"."CreationDate" >= CAST(now() AS date)
      AND "Position"."CreationDate" < CAST((CAST(now() AS timestamp) + (INTERVAL '1 day')) AS date))
    AND "PrivilegeLevel"."entryTime"::time > "Position"."CreationDate"::TIME
    AND "Person"."deletedAt" IS NULL
    AND "Position"."deletedAt" IS NULL
    AND "PrivilegeLevel"."deletedAt" IS NULL
    ORDER BY
      "Position"."CreationDate" DESC) AS "results"
    WHERE ("results"."CreationDate" >= date_trunc('minute', CAST((CAST(now() AS timestamp) + (INTERVAL '-30 minute')) AS timestamp))
      AND "results"."CreationDate" < date_trunc('minute', CAST((CAST(now() AS timestamp) + (INTERVAL '1 minute')) AS timestamp)))
    `
  );
  return persons;
};

const readAbsentPerson = async () => {
  const [persons] = await sequelize.query(
    `
    SELECT
      "Person"."name",
      "Person"."firstLastName",
      "Person"."idPerson",
      "Facility"."idOrganization"
    FROM
      "Person"
      LEFT JOIN "Facility" ON "Facility"."idFacility" = "Person"."idFacility"
    WHERE
      "Person"."idPerson" NOT in(
        SELECT
          "Person"."idPerson" FROM "Position"
        LEFT JOIN "Person" ON "Person"."idPerson" = "Position"."idPerson"
      WHERE ("Position"."CreationDate" >= CAST(now() AS date)
        AND "Position"."CreationDate" < CAST((CAST(now() AS timestamp) + (INTERVAL '1 day')) AS date)))
      AND "Person"."deletedAt" IS NULL
    ORDER BY
      "Person"."idPerson" ASC
    `
  );
  return persons;
};

module.exports = {
  readEmployee,
  readEmployees,
  readVisitor,
  readVisitors,
  readEmployeesFacilities,
  readPersonByBeaconMac,
  readPerson,
  readAbsentPerson,
  readLateCheckin,
};
