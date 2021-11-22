const cron = require("node-cron");
const moment = require("moment");
const { createAlert } = require("../actions/alerts/create");
const { readLateCheckin, readAbsentPerson } = require("../actions/persons");

const lateCheckin = cron.schedule("*/30 * * * *", async () => {
  console.log(Date(), "lateCheckin");
  const persons = await readLateCheckin()
  promises = persons.map(async ({ idPerson, name, firstLastName }) => {
    const body = {
      payload: `${name} ${firstLastName} llegó tarde a las ${moment().format("YYYY-MM-DD HH:MM")} `,
      idArea: null,
      idPerson,
      date: Date(),
      idAlertType: 1,
    };
    await createAlert(body)
  });
  await Promise.all(promises);
  console.log(Date(), "lateCheckin done!")
});

const absentAlert = cron.schedule("0 6 */1 * *", async () => {
  console.log(Date(), "absentAlert");
  const persons = await readAbsentPerson();
  promises = persons.map(async ({ idPerson, name, firstLastName }) => {
    const body = {
      payload: `${name} ${firstLastName} no se presentó el día ${moment().format("YYYY-MM-DD")} `,
      idArea: null,
      idPerson,
      date: Date(),
      idAlertType: 6,
    };
    await createAlert(body)
  });
  await Promise.all(promises);
  console.log(Date(), "absentAlert done!")
});

module.exports = {
  lateCheckin,
  absentAlert,
};
