const { userController } = require('@src/controllers');
const { userMiddleware } = require('@src/middlewares');
const express = require('express');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userMiddleware.validateInputUser, userController.createUsers);
router.put('/:id', userMiddleware.validateInputUser, userController.updateUsers);
router.delete('/:id', userController.deleteUsers);

module.exports = router;