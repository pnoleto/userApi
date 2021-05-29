const express = require('express');
const authcontroller = require('../controllers/authenticateController');

const router = express.Router();

router.post('/authorize', authcontroller.Authorize);
router.post('/refreshToken', authcontroller.RefreshToken);

module.exports = router;