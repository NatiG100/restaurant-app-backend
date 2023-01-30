const express = require('express');
const { DeleteAllDrinkCategory, AddDrinkCategory } = require('../controllers/DrinkCategoryControllers');
const fileUpload = require('../utils/fileUpload');
const DrinkCategoryRoute = express.Router();

//test
DrinkCategoryRoute.delete('/delete',DeleteAllDrinkCategory);

//fetch all drink categories
DrinkCategoryRoute.get('/',()=>{});

//fetch a single drink category
DrinkCategoryRoute.get('/:drinkCategoryId',()=>{});

//update drink category
DrinkCategoryRoute.patch('/:drinkCategoryId/update',fileUpload('img/drinkCategory/').single('img'),()=>{});

//update status
DrinkCategoryRoute.patch('/:drinkCategoryId/change-status',()=>{})

//route for adding category
DrinkCategoryRoute.post('/',fileUpload('img/drinkCategory/').single('img'),AddDrinkCategory);

module.exports = DrinkCategoryRoute;