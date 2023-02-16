const express = require('express');
const { requestOrder, FetchAllOrders, DeleteAllOrders, ChangeOrderStatus } = require('../controllers/Ordercontrollers');
const Order = require('../models/OrderModel');

const OrderRouter = express.Router();

OrderRouter.delete('/delete',DeleteAllOrders)

OrderRouter.post('/',requestOrder);
OrderRouter.get('/',FetchAllOrders);
OrderRouter.patch('/:orderId/change-status',ChangeOrderStatus)

module.exports = OrderRouter;