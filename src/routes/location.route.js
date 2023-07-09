const { userController, locationController } = require('@src/controllers');
const express = require('express');

const router = express.Router();

router.get('/', locationController.getLocations);

module.exports = router;