const express = require('express');
const { DeleteAllDrink, AddDrink, FetchAllDrinks, FetchDrink, ChangeDrinkStatus, UpdateDrink } = require('../controllers/DrinkControllers');
const fileUpload = require('../utils/fileUpload');
const DrinkRoute = express.Router();


//test
DrinkRoute.delete('/delete',DeleteAllDrink);

//fetch all drink
DrinkRoute.get('/',FetchAllDrinks);

//fetch a single drink
DrinkRoute.get('/:drinkId',FetchDrink);

//update drink
DrinkRoute.patch('/:drinkId/update',fileUpload('img/drink/').single('img'),UpdateDrink);

//update status
DrinkRoute.patch('/:drinkId/change-status',ChangeDrinkStatus)

//route for adding drink
DrinkRoute.post('/',fileUpload('img/drink/').single('img'),AddDrink);

module.exports = DrinkRoute;