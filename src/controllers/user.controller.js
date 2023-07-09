const { responseError, responseSuccess } = require("@src/utils/output");
const { User, Location } = require('@src/models');
const ApiErrorException = require("@src/exceptions/api-error.exception");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return responseSuccess(res, users);
  } catch (error) {
    return responseError(res, error);
  }
}

const createUsers = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      birthday,
      location
    } = req.body;

    const checkLocation = await Location.findOne({ where: { zoneName: location } })
    if (!checkLocation) throw new ApiErrorException('Invalid location!', 400);

    const user = await User.create({
      firstname,
      lastname,
      email,
      birthday,
      locationId: checkLocation.id
    });

    const data = {
      ...user.toJSON(),
      location: checkLocation,
    }

    return responseSuccess(res, data);
  } catch (error) {
    return responseError(res, error);
  }
}

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      birthday,
      location
    } = req.body;

    const checkLocation = await Location.findOne({ where: { zoneName: location } })
    if (!checkLocation) throw new ApiErrorException('Invalid location!', 400);

    const user = await User.findOne({ where: { id } });
    if (!user) throw new ApiErrorException('User not found!', 400);

    user.update({
      firstname,
      lastname,
      email,
      birthday,
      locationId: checkLocation.id
    })

    await user.save();

    const data = {
      ...user.toJSON(),
      location: checkLocation,
    }

    return responseSuccess(res, data);
  } catch (error) {
    return responseError(res, error);
  }
}

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (user) {
      await user.destroy();
    }

    return responseSuccess(res, { message: "Successfully deleted user!" });
  } catch (error) {
    return responseError(res, error);
  }
}

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};