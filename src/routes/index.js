const express = require('express');
const { responseSuccess } = require('@src/utils/output');
const locationRoute = require('./location.route');
const userRoute = require('./user.route');

const router = express.Router();

router.get('/', (req, res) => {
  return responseSuccess(res, {
    message: 'Welcome to our API',
  })
});

router.use('/user', userRoute);
router.use('/location', locationRoute);

module.exports = router;
