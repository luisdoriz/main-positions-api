const moment = require("moment");
const Facilites = require("../actions/facilities");

exports.getFacilityReport = async (req, res) => {
  //links a beacon to a person
  const { from, to, idFacility } = req.body;
  let fromDate = from;
  let toDate = to;
  if (!from) {
    fromDate = moment().startOf("month").format("YYYY-MM-DD");
  }
  if (!to) {
    toDate = moment().endOf("month").format("YYYY-MM-DD");
  }
  if (!idFacility) {
    res.status(400).json({ status: "error", message: "idFaciliy is required" });
  }
  const query = { toDate, fromDate, idFacility };
  try {
    const [areaTraffic] = await Facilites.getAreaTraffic(query);
    const [areaOcurrencies] = await Facilites.getOcurrenciesPerArea(query);
    const [checkIn] = await Facilites.getCheckIn(query);
    const [casesReport] = await Facilites.getCasesReport(query);
    const [casesReportData] = await Facilites.getCasesReportData(query);
    const [timeSpentData] = await Facilites.getTimeSpentReport(query);
    res.status(200).json({
      status: "success",
      data: {
        areaTraffic,
        areaOcurrencies,
        checkIn,
        cases: { casesReport, casesReportData },
        timeSpentData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error });
  }
};
