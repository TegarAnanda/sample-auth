const router = require('express').Router();

router.use('/admin', require('./admin'));
router.use('/auth', require("./auth"));
router.use('/user', require("./user"));

module.exports = router;