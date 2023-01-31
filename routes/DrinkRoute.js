const express = require('express');
const fileUpload = require('../utils/fileUpload');
const DrinkRoute = express.Router();


//test
DrinkRoute.delete('/delete',()=>{});

//fetch all drink
DrinkRoute.get('/',()=>{});

//fetch a single drink
DrinkRoute.get('/:drinkId',()=>{});

//update drink
DrinkRoute.patch('/:drinkId/update',fileUpload('img/drink/').single('img'),()=>{});

//update status
DrinkRoute.patch('/:drinkId/change-status',()=>{})

//route for adding drink
DrinkRoute.post('/',fileUpload('img/drink/').single('img'),()=>{});

module.exports = DrinkRoute;