const express = require('express');
const fileUpload = require('../utils/fileUpload');
const FoodRoute = express.Router();
const {
    AddFood, 
    DeleteAllFood, 
    FetchAllFoods, 
    FetchFood, 
    ChangeFoodStatus,
    UpdateFood
} = require('../controllers/FoodControllers');
const requirePermission = require('../utils/requirePermission');

//test
FoodRoute.delete('/delete',DeleteAllFood);

//fetch all food
FoodRoute.get('/',FetchAllFoods);

//fetch a single food
FoodRoute.get('/:foodId',FetchFood);

//update food
FoodRoute.patch(
    '/:foodId/update',
    requirePermission("Manage Items"),
    fileUpload('img/food/').single('img'),
    UpdateFood
);

//update status
FoodRoute.patch(
    '/:foodId/change-status',
    requirePermission("Manage Items"),
    ChangeFoodStatus
);

//route for adding food
FoodRoute.post(
    '/',
    requirePermission("Manage Items"),
    fileUpload('img/food/').single('img'),
    AddFood
);

module.exports = FoodRoute;