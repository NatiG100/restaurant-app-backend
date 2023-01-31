const express = require('express');
const { DeleteAllDrink, AddDrink, FetchAllDrinks } = require('../controllers/DrinkControllers');
const fileUpload = require('../utils/fileUpload');
const DrinkRoute = express.Router();


//test
DrinkRoute.delete('/delete',DeleteAllDrink);

//fetch all drink
DrinkRoute.get('/',FetchAllDrinks);

//fetch a single drink
DrinkRoute.get('/:drinkId',()=>{});

//update drink
DrinkRoute.patch('/:drinkId/update',fileUpload('img/drink/').single('img'),()=>{});

//update status
DrinkRoute.patch('/:drinkId/change-status',()=>{})

//route for adding drink
DrinkRoute.post('/',fileUpload('img/drink/').single('img'),AddDrink);

module.exports = DrinkRoute;