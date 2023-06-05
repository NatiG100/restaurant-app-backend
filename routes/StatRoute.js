const express = require('express');
const { GetGeneralStat, getTopItems } = require('../controllers/StatControllers');
const FetchAllSales = require('../controllers/StatControllers/AllSalesController');
const FetchOrdersChartData = require('../controllers/StatControllers/OrderChartController');
const FetchSalesChartData = require('../controllers/StatControllers/SalesChartControlelr');
const GenerateStat = require('../controllers/StatControllers/StatController');
const StatRoute = express.Router();

StatRoute.get('/general',GetGeneralStat);
StatRoute.get('/top-items',getTopItems);
StatRoute.get('/sales',FetchSalesChartData);
StatRoute.get('/orders',FetchOrdersChartData);
StatRoute.get('/sales-all',FetchAllSales);
StatRoute.get('/generate',GenerateStat);

module.exports = StatRoute;