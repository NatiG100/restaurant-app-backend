const express = require('express');
const { DeleteAllTables, FetchAllTables, AddTable, FetchTable, UpdateTable, ChangeTableStatus, DeleteTable } = require('../controllers/TableControllers');
const TableRoute = express.Router();

//test
TableRoute.delete('/delete',DeleteAllTables);

//fetch all table
TableRoute.get('/',FetchAllTables);

//fetch a single table
TableRoute.get('/:tableId',FetchTable);

//delete table
TableRoute.delete('/:tableId',DeleteTable);

//update table
TableRoute.patch('/:tableId/update',UpdateTable);

//update status
TableRoute.patch('/:tableId/change-status',ChangeTableStatus)

//route for adding table
TableRoute.post('/',AddTable);

module.exports = TableRoute;