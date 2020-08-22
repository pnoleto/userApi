const authorize = require('../../helpers/authorizeHandler');
const controller = require('../controllers/personController');
const rolesEnum = require('../../enums/rolesEnum');
const express = require('express');

const router = express.Router();

router.get('/all', authorize(rolesEnum.admin, rolesEnum.user), controller.get);
router.post('/', authorize(rolesEnum.admin, rolesEnum.user), controller.post);
router.put('/:id', authorize(rolesEnum.admin, rolesEnum.user), controller.put);
router.delete('/:id', authorize(rolesEnum.admin, rolesEnum.user), controller.delete);

module.exports = router;