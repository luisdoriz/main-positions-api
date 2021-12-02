const Alerts = require("../actions/alerts");
const PrivilegeLevel = require("../actions/priviledgeLevels");
const Areas = require("../actions/areas");
const Positions = require("../actions/positions");
const Persons = require("../actions/persons");
const moment = require("moment");

exports.getAlerts = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const alerts = await Alerts.readAlerts({ idOrganization });
    res.status(200).json({ status: "success", data: alerts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getAlertTypes = async (req, res) => {
  try {
    const alertTypes = await Alerts.readAlertTypes();
    res.status(200).json({ status: "success", data: alertTypes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.postAlert = async (req, res) => {
  const { payload, idArea, idPerson, date, idAlertType } = req.body;
  try {
    const alert = await Alerts.createAlert({
      payload,
      idArea,
      idPerson,
      date,
      idAlertType,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: alert });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putAlert = async (req, res) => {
  return;
};

exports.deleteAlert = async (req, res) => {
  try {
    const { idAlert } = req.params;
    const alerts = await Alerts.deleteAlert({ idAlert });
    res.status(200).json({ status: "success", data: alerts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.generateAlerts = async ({
  x,
  y,
  from,
  to,
  area,
  beacon,
  idBeacon,
  idPerson,
  idPrivilegeLevel,
}) => {
  //check if position triggers an alert. (called on put positions)
  //console.log({ x, y, from, to, area, beacon, idBeacon, idPerson, idPrivilegeLevel })

  //generate alert for being in restricted area
  const isInRestrictedArea = await checkRestrictedArea({
    area,
    idPrivilegeLevel,
  });
  if (isInRestrictedArea) {
    const person = await Persons.readPerson(idPerson);
    const rArea = await Areas.readArea(area);
    let payload = `${person.name} ${person.firstLastName} ${person.secondLastName} ha entrado a la area restringida: ${rArea.name}`;
    Alerts.createAlert({
      payload,
      idArea: area,
      idPerson,
      date: to,
      idAlertType: 3,
    });
  }
  const { timeLimit, maxCapacity } = await Areas.readArea(area);
  if (timeLimit) {
    console.log(timeLimit);
    //generate alert for being too much time in an area
    const { excededTimeLimit, timeInArea } = await checkTimeAllowed({
      from,
      to,
      area,
      idPerson,
      timeLimit,
    });
    console.log(excededTimeLimit, timeInArea);
    if (excededTimeLimit) {
      //console.log('alert: person exceded time allowed in area', area)
      const person = await Persons.readPerson(idPerson);
      const rArea = await Areas.readArea(area);
      let payload = `${person.name} ${person.firstLastName} ${person.secondLastName} ha excedido el tiempo permitido en el area "${rArea.name}" con un total de ${timeInArea} minutos`;
      Alerts.createAlert({
        payload,
        idArea: area,
        idPerson,
        date: to,
        idAlertType: 4,
      });
    }
  }

  if (maxCapacity) {
    //generate alert for being too much time in an area
    const { excededOcuppancy, numPeople } = await checkMaxOcuppancy({
      to,
      area,
      maxCapacity,
    });
    if (excededOcuppancy) {
      //console.log('alert: area max occupancy exceded', area)
      const rArea = await Areas.readArea(area);
      let payload = `Se ha excedido el limite de personas permitidas en el area "${rArea.name}" con un total de ${numPeople} personas`;
      Alerts.createAlert({
        payload,
        idArea: area,
        idPerson,
        date: to,
        idAlertType: 5,
      });
    }
  }
};

//-------------------------------------------------------------------------------------------------------------------------
const checkRestrictedArea = async ({ area, idPrivilegeLevel }) => {
  //checks if person in position is in a restricted area
  const where = { idPrivilegeLevel };
  const [pl] = await PrivilegeLevel.readPrivilegeLevels(where);
  let isInRestrictedArea = true;
  //iterate allowed areas and check if person was in an allowed area
  pl.areas.forEach((allowedArea) => {
    if (allowedArea.idArea == area) isInRestrictedArea = false;
  });
  return isInRestrictedArea;
};

const checkTimeAllowed = async ({ from, to, area, idPerson, timeLimit }) => {
  let excededTimeLimit = false;
  //get person positions in latest 24h
  const positions = await Positions.readPositionsPerson24h({
    idPerson,
    area,
    from,
    to,
  });
  const numPositions = positions.length;
  //get position from latest area person has been in
  const latestArea = positions[numPositions - 1];
  //iterate positions backwards summing total time in lastest area
  let timeInArea = 0; //minutes
  for (let i = numPositions - 1; i >= 0; i--) {
    if (positions[i].idArea != latestArea.idArea) break;
    const posFrom = moment(positions[i].from, "YYYY-MM-DD HH:mm:ss.SSS");
    const posTo = moment(positions[i].to, "YYYY-MM-DD HH:mm:ss.SSS");
    const minutesInPosition = posTo.diff(posFrom, "minutes");
    timeInArea += minutesInPosition == 0 ? 1 : minutesInPosition;
    //console.log(positions[i].idPosition, posTo.diff(posFrom, 'minutes'))
  }
  //add to total time spent in newly added position row (data from req.body)
  const reqFrom = moment(from, "YYYY-MM-DD HH:mm:ss.SSS");
  const reqTo = moment(to, "YYYY-MM-DD HH:mm:ss.SSS");
  timeInArea += reqTo.diff(reqFrom, "minutes");
  //check if person exceded time limit in area
  if (timeInArea >= timeLimit) excededTimeLimit = true;
  return { excededTimeLimit, timeInArea };
};

const checkMaxOcuppancy = async ({ to, area, maxCapacity }) => {
  //check live number of people in area in "to" date. to - 5 min, and count unique persons
  const numPeople = await Positions.readPersonsPositionsArea({ area, to });
  let excededOcuppancy = numPeople > maxCapacity ? true : false;
  return { excededOcuppancy, numPeople };
};
