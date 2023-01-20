const express = require('express');
const fileUpload = require('../utils/fileUpload');
const FoodRoute = express.Router();
const {AddFood, DeleteAllFood} = require('../controllers/FoodControllers')

//test
FoodRoute.delete('/delete',DeleteAllFood);

//fetch all food categories
FoodRoute.get('/',()=>{});

//fetch a single food category
FoodRoute.get('/:foodId',()=>{});

//update food category
FoodRoute.patch('/:foodId/update',fileUpload('img/foodCategory/').single('img'),()=>{});

//update status
FoodRoute.patch('/:foodId/change-status',()=>{})

//route for adding category
FoodRoute.post('/',fileUpload('img/foodId/').single('img'),AddFood);

module.exports = FoodRoute;