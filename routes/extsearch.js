'use strict';

const express = require('express');
const router = express.Router();
const {genPartialDict} = require('../controllers/extsearchController')

router.get('/:simpChin/:tradChin', genPartialDict);
router.get('/', (req, res) => res.json({}));

module.exports = router;
