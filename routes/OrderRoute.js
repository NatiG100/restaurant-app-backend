const express = require('express');
const { requestOrder, FetchAllOrders } = require('../controllers/Ordercontrollers');

const OrderRouter = express.Router();

OrderRouter.post('/',requestOrder);
OrderRouter.get('/',FetchAllOrders)

module.exports = OrderRouter;