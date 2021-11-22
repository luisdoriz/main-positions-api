const Positions = require("../actions/positions");
const { generateAlerts } = require("./alerts");

exports.postPositions = async (req, res) => {
  const { x, y, from, to, idArea, idBeacon } = req.body;
  try {
    const position = await Positions.createPosition({
      x,
      y,
      from,
      to,
      idArea,
      idBeacon,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: position });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getPositions = async (req, res) => {
  const { idFacility } = req.query;
  try {
    const { idOrganization } = req.user;
    const positions = await Positions.getActualPositions(idFacility, idOrganization);
    res.status(201).json({ status: "success", data: positions });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putPositions = async (req, res) => {
  //data from flask. create or update position and check if alert is generated
  const { positions } = req.body;
  console.log(positions);
  try {
    for (let position of positions) {
      const { x, y, from, to, area, beacon } = position;
      const { idBeacon, idPerson, idPrivilegeLevel } =
        await Positions.upsertPosition({
          x,
          y,
          from,
          to,
          area,
          beacon,
          isActive: 1,
          CreatedBy: req.user.idUser,
          UpdatedBy: req.user.idUser,
        });
      generateAlerts({
        x,
        y,
        from,
        to,
        area,
        beacon,
        idBeacon,
        idPerson,
        idPrivilegeLevel,
      });
    }
    res.status(200).json({ status: "success", data: positions.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.deletePositions = async (req, res) => {
  return;
};
