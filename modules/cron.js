const cron = require("node-cron");
const moment = require("moment");
const webpush = require("web-push");

const { createAlert } = require("../actions/alerts/create");
const { readLateCheckin, readAbsentPerson } = require("../actions/persons");
const Users = require("../actions/users");

webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const sendNotification = (subscription, payload) =>
  webpush
    .sendNotification(subscription, payload)
    .catch((e) => console.log(e.stack));

const emitNotification = async (idOrganization, payload) => {
  const subscriptions = await Users.getUserNotificationData(idOrganization);
  console.log(subscriptions)
  subscriptions.forEach((subscription) =>
    sendNotification(subscription, payload)
  );
};

const lateCheckin = cron.schedule("*/30 * * * *", async () => {
  console.log(Date(), "lateCheckin");
  const persons = await readLateCheckin();
  promises = persons.map(async ({ idPerson, name, firstLastName, idOrganization }) => {
    const payload = `${name} ${firstLastName} llegó tarde a las ${moment().format(
      "YYYY-MM-DD HH:MM"
    )} `
    const body = {
      payload,
      idArea: null,
      idPerson,
      date: Date(),
      idAlertType: 1,
    };
    await createAlert(body);
    await emitNotification(idOrganization, payload)
  });
  await Promise.all(promises);
  console.log(Date(), "lateCheckin done!");
});
// 0 6 */1 * *
const absentAlert = cron.schedule("0 2 * * 1-5", async () => {
  console.log(Date(), "absentAlert");
  const persons = await readAbsentPerson();
  promises = persons.map(async ({ idPerson, name, firstLastName, idOrganization }) => {
    const payload = `${name} ${firstLastName} no se presentó el día ${moment().format(
      "YYYY-MM-DD"
    )} `
    const body = {
      payload,
      idArea: null,
      idPerson,
      date: Date(),
      idAlertType: 6,
    };
    const notification = JSON.stringify({
      title: 'Falta',
      body: payload,
    })
    await createAlert(body);
    await emitNotification(idOrganization, notification)
    return true
  });
  await Promise.all(promises);
  console.log(Date(), "absentAlert done!");
});

module.exports = {
  lateCheckin,
  absentAlert,
};
