const Drink = require("../models/DrinkModel");
const Food = require("../models/FoodModel");
const Order = require("../models/OrderModel");
const {genFilter } = require("../utils/dateUtils");

const GetGeneralStat = async (req,res)=>{    
    const filter = genFilter("weekly");
    try{
        const weeklySales = await Order.aggregate([
            {
                $match:
                {
                    "date":{$gte:new Date(filter)},
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
        const totalSales = await Order.aggregate([
            {
                $match:
                {
                    "date":{$lte:new Date(filter)},
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
        let salesDelta = '-';
        if(totalSales-weeklySales!==0){
            salesDelta = parseFloat(((100*weeklySales[0].total||0)/((totalSales[0].total||-1)-(weeklySales[0].total||0))).toFixed(2));
        }
        console.log(weeklySales);
        const foodCount  = await Food.estimatedDocumentCount();
        const drinkCount  = await Drink.estimatedDocumentCount();
        const weeklyFoodIncrease = await Food.aggregate([
            {
                $match:
                {
                    "created":{$gte:new Date(filter)},
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
                    "created":{$gte:new Date(filter)},
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
            salesDelta,
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

const getTopItems = async (req,res)=>{
    const filter = genFilter("weekly");
    const howMany = parseInt(req.query.howMany);
    try{
        const topFoods = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:
                {
                    "items.itemType":"food",
                    "status":"Served",
                },
            },
            {
                $group:{
                    _id:"$items.itemId",
                    total:{
                        $sum:{$multiply:["$items.cost","$items.amount"]}
                    },
                    name:{
                        $first:"$items.name"
                    },
                    amount:{
                        $sum:"$items.amount"
                    },
                    img:{
                        $first:"$items.img"
                    }
                }
            },
            {
                $sort:{
                    total:-1
                }
            },
            {
                $limit:howMany||3
            }
        ]);
        const topDrinks = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:
                {
                    "items.itemType":"drink",
                    "status":"Served",
                },
            },
            {
                $group:{
                    _id:"$items.itemId",
                    total:{
                        $sum:{$multiply:["$items.cost","$items.amount"]}
                    },
                    name:{
                        $first:"$items.name"
                    },
                    amount:{
                        $sum:"$items.amount"
                    },
                    img:{
                        $first:"$items.img"
                    }
                }
            },
            {
                $sort:{
                    total:-1
                }
            },
            {
                $limit:howMany||3
            }
        ]);
        res.status(200).json({data:{topFoods,topDrinks}})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to fetch top items"})
    }
}

module.exports = {
    GetGeneralStat,
    getTopItems,
}