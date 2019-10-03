const express = require('express');
const router = express.Router();
const {genPartialDict} = require('../controllers/extsearchController')

router.get('/:simpChin/:tradChin', genPartialDict);

module.exports = router;
