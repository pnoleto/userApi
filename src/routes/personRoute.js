const controller = require('../controllers/personController')
const express = require('express');

const router = express.Router();

router.get('/all', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;