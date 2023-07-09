require('module-alias/register');

const { User, Location } = require("@src/models");
const constants = require('@src/utils/constants');
const { default: axios } = require("axios");

const fetchTimeZone = async () => {
  const fetchAPI = axios.get(constants.FETCH_TIMEZONE_URL)
    .then(async (resp) => {
      if (resp?.data?.zones) {
        for (const key in resp.data.zones) {
          if (Object.hasOwnProperty.call(resp.data.zones, key)) {
            const zone = resp.data.zones[key];

            const location = await Location.findOne({
              where: {
                countryCode: zone.countryCode,
                countryName: zone.countryName,
                zoneName: zone.zoneName,
                gmtOffset: zone.gmtOffset,
              }
            })

            if (!location) {
              await Location.create({
                countryCode: zone.countryCode,
                countryName: zone.countryName,
                zoneName: zone.zoneName,
                gmtOffset: zone.gmtOffset,
              })
            }
          }
        }
      }
      console.log('Successfully fetch timezone!')
    })
    .catch((e) => {
      console.log('error: ' + e.message);
      if (e?.response?.data?.message) {
        console.log('message: ' + e.response.data.message);
      }
    })
    .finally(() => {
      process.exit();
    });
}

fetchTimeZone();