const Drink = require("../models/DrinkModel");
const Food = require("../models/FoodModel");
const Order = require("../models/OrderModel");

const GetGeneralStat = async (req,res)=>{
    try{
        const drinkCount = await Drink.count();
        const foodCount = await Food.count();
    }catch(error){
        res.status(500).json({message:"Failed to fetch general stat"});
    }
}