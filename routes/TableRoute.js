const express = require('express');
const { DeleteAllTables, FetchAllTables, AddTable } = require('../controllers/TableControllers');
const TableRoute = express.Router();

//test
TableRoute.delete('/delete',DeleteAllTables);

//fetch all table
TableRoute.get('/',FetchAllTables);

//fetch a single table
TableRoute.get('/:tableId',()=>{});

//update table
TableRoute.patch('/:tableId/update',()=>{});

//update status
TableRoute.patch('/:tableId/change-status',()=>{})

//route for adding table
TableRoute.post('/',AddTable);

module.exports = TableRoute;