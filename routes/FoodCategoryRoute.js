const express = require('express');
const { AddFoodCategory, DeleteAll, FetchAllFoodCategories, FetchFoodCategory, ChangeFoodCategoryStatus, UpdateFoodCategory } = require('../controllers/FoodCategoryControllers');
const fileUpload = require('../utils/fileUpload');
const requirePermission = require('../utils/requirePermission');
const FoodCategoryRoute = express.Router();

//test
FoodCategoryRoute.delete('/delete',DeleteAll);

//fetch all food categories
FoodCategoryRoute.get('/',FetchAllFoodCategories);

//fetch a single food category
FoodCategoryRoute.get('/:foodCategoryId',FetchFoodCategory);

//update food category
FoodCategoryRoute.patch(
    '/:foodCategoryId/update',
    requirePermission('Manage Items'),
    fileUpload('img/foodCategory/').single('img'),
    UpdateFoodCategory
);

//update status
FoodCategoryRoute.patch(
    '/:foodCategoryId/change-status',
    requirePermission('Manage Items'),
    ChangeFoodCategoryStatus
)

//route for adding category
FoodCategoryRoute.post(
    '/',
    requirePermission('Manage Items'),
    fileUpload('img/foodCategory/').single('img'),
    AddFoodCategory
);

module.exports = FoodCategoryRoute;