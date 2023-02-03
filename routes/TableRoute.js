const express = require('express');
const TableRoute = express.Router();

//test
TableRoute.delete('/delete',()=>{});

//fetch all table
TableRoute.get('/',()=>{});

//fetch a single table
TableRoute.get('/:tableId',()=>{});

//update table
TableRoute.patch('/:tableId/update',()=>{});

//update status
TableRoute.patch('/:tableId/change-status',()=>{})

//route for adding table
TableRoute.post('/',()=>{});

module.exports = TableRoute;