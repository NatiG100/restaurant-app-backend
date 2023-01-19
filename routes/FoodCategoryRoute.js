const express = require('express');
const { AddFoodCategory, DeleteAll, FetchAllFoodCategories, FetchFoodCategory, ChangeFoodCategoryStatus } = require('../controllers/FoodCategoryControllers');
const fileUpload = require('../utils/fileUpload');
const FoodCategoryRoute = express.Router();

//test
FoodCategoryRoute.delete('/delete',DeleteAll);

//fetch all food categories
FoodCategoryRoute.get('/',FetchAllFoodCategories);

//fetch a single food category
FoodCategoryRoute.get('/:foodCategoryId',FetchFoodCategory);

//update food category
FoodCategoryRoute.patch('/:id/update',()=>{});

//update status
FoodCategoryRoute.patch('/:foodCategoryId/change-status',ChangeFoodCategoryStatus)

//route for adding category
FoodCategoryRoute.post('/',fileUpload('img/foodCategory/').single('img'),AddFoodCategory);

module.exports = FoodCategoryRoute;
