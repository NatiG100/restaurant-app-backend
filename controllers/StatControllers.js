const Drink = require("../models/DrinkModel");
const Food = require("../models/FoodModel");
const Order = require("../models/OrderModel");
const { parseDate } = require("../utils/dateUtils");

const GetGeneralStat = async (req,res)=>{
    const {month,date,day,year} = parseDate(Date.now());
    let dateFilter = date-day;
    if(dateFilter<1) dateFilter+=30;
    try{
        const weeklySales = await Order.aggregate([
            {
                $match:
                {
                    "date":{$gte:new Date(year+"-"+month+"-"+dateFilter)},
                    "status":"Served",
                },
            },
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:"$totalCost"
                    }
                }
            }
        ]);
        const foodCount  = await Food.estimatedDocumentCount();
        const drinkCount  = await Drink.estimatedDocumentCount();
        const weeklyFoodIncrease = await Food.aggregate([
            {
                $match:
                {
                    "created":{$gte:new Date(year+"-"+month+"-"+dateFilter)},
                },
            },
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:1
                    }
                }
            }
        ]);
        const weeklyDrinkIncrease = await Drink.aggregate([
            {
                $match:
                {
                    "created":{$gte:new Date(year+"-"+month+"-"+dateFilter)},
                },
            },
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:1
                    }
                }
            }
        ]);
        const drinkInc = weeklyDrinkIncrease[0]?.total||0;
        const foodInc = weeklyFoodIncrease[0]?.total||0;
        let weeklyDrinkDelta = '-'
        if(drinkCount-drinkInc!==0){
            weeklyDrinkDelta = parseFloat(((100*drinkInc/(drinkCount-drinkInc)).toFixed(2)));
        }
        let weeklyFoodDelta = "-";
        if(foodCount-foodInc!==0){
            weeklyFoodDelta = parseFloat((100*foodInc/(foodCount-foodInc)).toFixed(2));
        }
        let result = {
            foodCount,
            drinkCount,
            weeklySales:weeklySales[0]?.total||0,
            weeklyDrinkIncrease:weeklyDrinkDelta,
            weeklyFoodIncrease:weeklyFoodDelta,
        }
        res.status(200).json({data:result});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to fetch general stat"});
    }
}

module.exports = {
    GetGeneralStat
}