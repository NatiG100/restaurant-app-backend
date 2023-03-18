const express = require('express');
const { DeleteAllTables, FetchAllTables, AddTable, FetchTable, UpdateTable, ChangeTableStatus, DeleteTable } = require('../controllers/TableControllers');
const requirePermission = require('../utils/requirePermission');
const TableRoute = express.Router();

//test
TableRoute.delete('/delete',DeleteAllTables);

//fetch all table
TableRoute.get(
    '/',
    requirePermission("View Tables"),
    FetchAllTables
);

//fetch a single table
TableRoute.get(
    '/:tableId',
    requirePermission("View Tables"),
    FetchTable
);

//delete table
TableRoute.delete(
    '/:tableId',
    requirePermission("Manage Tables"),
    DeleteTable
);

//update table
TableRoute.patch('/:tableId/update',UpdateTable);

//update status
TableRoute.patch(
    '/:tableId/change-status',
    requirePermission("Manage Tables"),
    ChangeTableStatus
);

//route for adding table
TableRoute.post(
    '/',
    requirePermission("Manage Tables"),
    AddTable
);

module.exports = TableRoute;