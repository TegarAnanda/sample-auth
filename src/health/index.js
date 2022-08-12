'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  process.nextTick(() => {
    res.send({
      success: true,
    });
  });
});

module.exports = router;