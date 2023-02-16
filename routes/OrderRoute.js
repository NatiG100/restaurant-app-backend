const express = require('express');
const { requestOrder } = require('../controllers/Ordercontrollers');

const OrderRouter = express.Router();

OrderRouter.post('/',requestOrder);

module.exports = OrderRouter;