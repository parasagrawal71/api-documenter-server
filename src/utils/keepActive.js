const schedule = require("node-schedule");
const UserModel = require("../models/user.model");
const { sendMail } = require("./send-mail");

const keepActive = async function () {
  try {
    if (process.env.NODE_ENV !== "production") {
      appLogger.debug(`Inside keepActive, Keep active process is disabled for environments other than production`);
      return;
    }

    appLogger.debug(`Inside keepActive, Initiating keep active process...`);

    /**
     * To keep database active
     */
    const totalUsers = await UserModel.countDocuments();
    appLogger.debug(`Inside keepActive, Database: totalUsers = ${totalUsers}`);

    /**
     * To keep email service active
     */
    const email = "parasagrawal71@gmail.com";
    const sendMailRes = await sendMail({ to: email, subject: "Keep active mail", html: `Keep active mail` });
    if (sendMailRes && sendMailRes[0] === false) {
      appLogger.debug({ msg: `Inside keepActive, Failed to send email`, info: sendMailRes });
    }
    appLogger.debug({ msg: `Inside keepActive, Email sent`, info: sendMailRes });

    appLogger.debug(`Inside keepActive, Keep active process completed.`);
  } catch (error) {
    appLogger.error({ msg: `Inside keepActive, error: `, error });
    appLogger.error(`Inside keepActive, Keep active process erred.`);
  }
};

module.exports = () =>
  setTimeout(() => {
    const TIME = "0 6 * * 7"; // At 06:00 on Saturday
    // const TIME = "59 10 * * *"; // Debug Time
    const job = schedule.scheduleJob(TIME, function () {
      keepActive();
    });
  }, 3000);
