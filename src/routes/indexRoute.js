const express = require('express');

const router = express.Router();

router.get('', (req, res, next) => {
    res.status(200).send({
        title: "Node Express API",
        version: `v1`
    });
});

module.exports = router;