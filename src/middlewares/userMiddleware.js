const { responseError } = require("@src/utils/output");
const Joi = require("joi");

const validateInputUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      birthday: Joi.date().required(),
      location: Joi.string().required(),
    });

    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return responseError(res, error);
  }
}

module.exports = {
  validateInputUser
};