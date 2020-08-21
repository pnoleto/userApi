const controller = require('./../controllers/authenticateController')
const express = require('express');

const router = express.Router();

router.post('/token', controller.authenticate);
router.post('/refreshToken', controller.refreshToken);

module.exports = router;