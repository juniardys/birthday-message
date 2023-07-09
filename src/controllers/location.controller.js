const { responseError, responseSuccess } = require("@src/utils/output")
const { Location } = require('@src/models');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll()

    return responseSuccess(res, locations);
  } catch (error) {
    return responseError(res, error);
  }
}

module.exports = {
  getLocations,
};