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

    console.log(from)
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
                    total:{
                        $sum:"$items.amount"
                    }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ])
        res.status(200).json({data});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to generate stat"})
    }
}

module.exports = GenerateStat;