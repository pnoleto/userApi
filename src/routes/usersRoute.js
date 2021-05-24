const express = require('express');
const rolesEnum = require('../../domain/enums/rolesEnum');
const authorize = require('../../helpers/authorizeHandler');
const userscontroller = require('../controllers/userController');

const router = express.Router();

router.post('', authorize(rolesEnum.admin), userscontroller.Insert);
router.get('', authorize(rolesEnum.admin), userscontroller.List);
router.delete('/:socialId', authorize(rolesEnum.admin), userscontroller.Delete);

module.exports = router;