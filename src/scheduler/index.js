require('module-alias/register');

const schedule = require("node-schedule");
const constants = require('@src/utils/constants');
const { sendMessage, prepareBirthdayMessage } = require('@src/scheduler/message.scheduler');

const runScheduler = async () => {
  // Prepare queue 1 minutes before 9 AM
  const birthdayPrepareMessageJob = schedule.scheduleJob('29,59 * * * *', () => {
    console.log('SCHEDULER: preparing birthday message!')
    prepareBirthdayMessage()
    console.log('SCHEDULER: preparing birthday message finished!')
  })

  // Send pending birthday messages every minutes
  const birthdaySendPendingMessageJob = schedule.scheduleJob('* * * * *', () => {
    console.log('SCHEDULER: send birthday pending message!')
    sendMessage('birthday', constants.JOBS.TYPE.PENDING);
    console.log('SCHEDULER: send birthday pending message finished!')
  })

  // Resend failed birthday messages every minutes
  const birthdayResendFailedMessageJob = schedule.scheduleJob('* * * * *', () => {
    console.log('SCHEDULER: resend birthday failed message!')
    sendMessage('birthday', constants.JOBS.TYPE.FAILED);
    console.log('SCHEDULER: resend birthday failed message finished!')
  })
}

module.exports = {
  runScheduler
};