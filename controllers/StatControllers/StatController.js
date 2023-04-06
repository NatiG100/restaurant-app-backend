const Order = require("../../models/OrderModel");

const GenerateStat = async(req,res)=>{
    const today = new Date(Date.now());
    const yesterday = new Date(Date.now());
    yesterday.setMilliseconds(0);
    yesterday.setSeconds(0);
    yesterday.setMinutes(0);
    yesterday.setHours(0);
    yesterday.setDate(yesterday.getDate()-1);
    let from  = new Date(req.query.from);
    let to = new Date(req.query.to)
    if(isNaN(from.getTime()) || isNaN(to.getTime())){
        from = yesterday;
        to = today;
    }
    const days = Math.ceil( ((to.getTime()- from.getTime())/(1000*3600*24)));
    console.log(days);
    try{
        let data = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:
                {
                    "date":{$gte:from,$lte:to},
                    "status":"Served",
                }
            },
            {
                $group:{
                    _id:"$items.itemType",
                    totalOrder:{
                        $sum:"$items.amount"
                    },
                    totalCost:{
                        $sum:{$multiply:["$items.amount","$items.cost"]}
                    }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);
        const d = {
            order:{
                drink:data[0]?.totalOrder||0,
                avgDrink:(data[0]?.totalOrder||0)/days,
                food:data[1]?.totalOrder||0,
                avgFood:(data[1]?.totalOrder||0)/days,
                total:(data[0]?.totalOrder||0)+(data[1]?.totalOrder||0),
                avgTotal:((data[0]?.totalOrder||0)+(data[1]?.totalOrder||0))/days
            },
            sales:{
                drink:data[0]?.totalCost||0,
                avgDrink:(data[0]?.totalCost||0)/days,
                food:data[1]?.totalCost||0,
                avgFood:(data[1]?.totalCost||0)/days,
                total:(data[0]?.totalCost||0)+(data[1]?.totalCost)||0,
                avgTotal:((data[0]?.totalCost||0)+(data[1]?.totalCost||0))/days
            }
        }
        res.status(200).json({data:d});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to generate stat"})
    }
}

module.exports = GenerateStat;