const express = require('express');
const rolesEnum = require('../../domain/enums/rolesEnum');
const authorize = require('../../helpers/authorizeHandler');
const userscontroller = require('../controllers/userController');
const authcontroller = require('./../controllers/authenticateController');

const router = express.Router();

router.post('/token', authcontroller.token);
router.post('/refreshToken', authcontroller.refreshToken);

router.post('/', authorize(rolesEnum.admin), userscontroller.post);
router.get('/', authorize(rolesEnum.admin), userscontroller.get);
router.delete('/:socialId', authorize(rolesEnum.admin), userscontroller.delete);

module.exports = router;