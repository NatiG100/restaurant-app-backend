const express = require('express');
const fileUpload = require('../utils/fileUpload');
const FoodRoute = express.Router();
const {AddFood, DeleteAllFood, FetchAllFoods} = require('../controllers/FoodControllers')

//test
FoodRoute.delete('/delete',DeleteAllFood);

//fetch all food
FoodRoute.get('/',FetchAllFoods);

//fetch a single food category
FoodRoute.get('/:foodId',()=>{});

//update food
FoodRoute.patch('/:foodId/update',fileUpload('img/foodCategory/').single('img'),()=>{});

//update status
FoodRoute.patch('/:foodId/change-status',()=>{})

//route for adding food
FoodRoute.post('/',fileUpload('img/food/').single('img'),AddFood);

module.exports = FoodRoute;