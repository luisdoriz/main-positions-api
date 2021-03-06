const Beacons = require("../actions/beacons");

exports.getBeaconsMQTT = async (req, res) => {
  //gets all beacons macAddress in database. Used in Messages Broker for knowing which macAddresses to read
  try {
    const beacons = await Beacons.readBeaconsMQTT();
    return res.status(200).send(beacons);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getBeacon = async (req, res) => {
  const { macAddress } = req.body;
  try {
    const beacon = await Beacons.readBeaconByMac({ macAddress });
    return res.status(200).json({ status: "success", data: beacon });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getBeaconsAll = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const beacons = await Beacons.readBeacons({ idOrganization });
    return res.status(200).json({ status: "success", data: beacons });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.getBeaconsAvailable = async (req, res) => {
  try {
    const { idOrganization } = req.user;
    const { idFacility } = req.query;
    const beacons = await Beacons.readBeaconsAvailable({ idOrganization, idFacility });
    return res.status(200).json({ status: "success", data: beacons });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.postBeacon = async (req, res) => {
  const { macAddress, idFacility } = req.body;
  try {
    const beacon = await Beacons.createBeacon({
      macAddress,
      idFacility,
      isActive: 1,
      CreatedBy: req.user.idUser,
      UpdatedBy: req.user.idUser,
    });
    res.status(201).json({ status: "success", data: beacon });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};

exports.putBeacon = async (req, res) => {
  return;
};

exports.deleteBeacon = async (req, res) => {
  const { idBeacon } = req.params;
  try {
    await Beacons.deleteBeacon({
      idBeacon,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
  }
};
