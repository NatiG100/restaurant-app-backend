const express = require('express');
const { GetGeneralStat, getTopItems } = require('../controllers/StatControllers');
const FetchSalesChartData = require('../controllers/StatControllers/SalesChartControlelr');
const StatRoute = express.Router();

StatRoute.get('/general',GetGeneralStat);
StatRoute.get('/top-items',getTopItems);
StatRoute.get('/sales',FetchSalesChartData)

module.exports = StatRoute;