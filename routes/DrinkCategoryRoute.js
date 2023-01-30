const express = require('express');
const { DeleteAllDrinkCategory, AddDrinkCategory, FetchAllDrinkCategories, FetchDrinkCategory, ChangeDrinkCategoryStatus, UpdateDrinkCategory } = require('../controllers/DrinkCategoryControllers');
const fileUpload = require('../utils/fileUpload');
const DrinkCategoryRoute = express.Router();

//test
DrinkCategoryRoute.delete('/delete',DeleteAllDrinkCategory);

//fetch all drink categories
DrinkCategoryRoute.get('/',FetchAllDrinkCategories);

//fetch a single drink category
DrinkCategoryRoute.get('/:drinkCategoryId',FetchDrinkCategory);

//update drink category
DrinkCategoryRoute.patch('/:drinkCategoryId/update',fileUpload('img/drinkCategory/').single('img'),UpdateDrinkCategory);

//update status
DrinkCategoryRoute.patch('/:drinkCategoryId/change-status',ChangeDrinkCategoryStatus)

//route for adding category
DrinkCategoryRoute.post('/',fileUpload('img/drinkCategory/').single('img'),AddDrinkCategory);

module.exports = DrinkCategoryRoute;