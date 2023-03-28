const express = require('express');
const { GetGeneralStat, getTopItems } = require('../controllers/StatControllers');
const StatRoute = express.Router();

StatRoute.get('/general',GetGeneralStat);
StatRoute.get('/top-items',getTopItems);

module.exports = StatRoute;