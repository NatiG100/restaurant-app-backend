const express = require('express');
const { GetGeneralStat, getTopItems } = require('../controllers/StatControllers');
const FetchAllSales = require('../controllers/StatControllers/AllSalesController');
const FetchOrdersChartData = require('../controllers/StatControllers/OrderChartController');
const FetchSalesChartData = require('../controllers/StatControllers/SalesChartControlelr');
const StatRoute = express.Router();

StatRoute.get('/general',GetGeneralStat);
StatRoute.get('/top-items',getTopItems);
StatRoute.get('/sales',FetchSalesChartData);
StatRoute.get('/orders',FetchOrdersChartData);
StatRoute.get('/sales-all',FetchAllSales);

module.exports = StatRoute;