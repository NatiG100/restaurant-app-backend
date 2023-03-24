const express = require('express');
const { GetGeneralStat } = require('../controllers/StatControllers');
const StatRoute = express.Router();

StatRoute.get('/general',GetGeneralStat);

module.exports = StatRoute;