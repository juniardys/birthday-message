const moment = require('moment');
const { Users, Location, Jobs } = require('@src/models');
const constants = require('@src/utils/constants');
const { default: axios } = require("axios");
const { Op } = require('sequelize');

const prepareBirthdayMessage = async () => {
  // define min & max offset
  const min = -43200;
  const max = 50400;

  // define date
  const utcNow = moment().add(1, 'minutes').utc(false);
  const utcTarget1 = moment.utc(utcNow.format("YYYY-MM-DD 09:00"));
  const utcTarget2 = moment.utc(utcNow.format("YYYY-MM-DD 09:00")).add(1, 'day');

  // get diff time in seconds for offset
  const diffTarget1 = utcTarget1.diff(utcNow, 'seconds');
  const diffTarget2 = utcTarget2.diff(utcNow, 'seconds');

  // check offset for search and put date
  let offsetSearch = [];
  if (diffTarget1 > min && diffTarget1 <= max) {
    offsetSearch.push(diffTarget1);
  }
  if (diffTarget2 > min && diffTarget2 <= max) {
    offsetSearch.push(diffTarget2);
  }

  // get locations
  const locations = await Location.findAll({
    where: {
      gmtOffset: {
        [Op.in]: offsetSearch,
      }
    }
  });

  // map locations ids
  const locationIds1 = [];
  const locationIds2 = [];
  locations.map((e) => {
    if (e.gmtOffset == diffTarget1) {
      locationIds1.push(e.id);
    }
    if (e.gmtOffset == diffTarget2) {
      locationIds2.push(e.id);
    }
  });

  // get users in birthday
  const where = {
    [Op.or]: []
  }
  if (locationIds1.length > 0) {
    where[Op.or].push({
      birthday: {
        [Op.endsWith]: utcTarget1.format('-MM-DD'),
      },
      locationId: {
        [Op.in]: locationIds1,
      },
    })
  }
  if (locationIds2.length > 0) {
    where[Op.or].push({
      birthday: {
        [Op.endsWith]: utcTarget2.format('-MM-DD'),
      },
      locationId: {
        [Op.in]: locationIds2,
      },
    })
  }
  const users = await Users.findAll({
    where
  })

  for (const key in users) {
    if (Object.hasOwnProperty.call(users, key)) {
      const user = users[key];
      await Jobs.create({
        type: 'birthday',
        status: constants.JOBS.TYPE.PENDING,
        data: {
          userId: user.id,
          userFullname: `${user.firstname} ${user.lastname}`,
          userEmail: user.email,
        },
      })
    }
  }
};

const sendMessage = async (type = 'birthday', status = constants.JOBS.TYPE.PENDING) => {
  // Get list job queue
  const jobs = await Jobs.findAll({
    where: {
      type,
      status,
    },
    limit: 100,
  });

  for (const key in jobs) {
    if (Object.hasOwnProperty.call(jobs, key)) {
      const job = jobs[key];
      try {
        // Try to send email
        await axios.post(constants.EMAIL_SERVICE_URL, {
          email: job.data.userEmail,
          message: `Hey, ${job.data.userFullname} it’s your birthday`
        })

        // Update status completed if success
        job.update({
          status: constants.JOBS.TYPE.COMPLETED
        });

        await job.save();
      } catch (error) {
        // check if job status pending
        if (job.status == constants.JOBS.TYPE.PENDING) {
          // update status failed
          job.update({
            status: constants.JOBS.TYPE.FAILED
          })
  
          await job.save();
        }
      }
    }
  }
};

module.exports = {
  prepareBirthdayMessage,
  sendMessage,
}