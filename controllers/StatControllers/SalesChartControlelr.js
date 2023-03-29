const Order = require("../../models/OrderModel");
const { getDateFormat, getMatchFilter } = require("../../utils/dateUtils");

const types = ["weekly","monthly","yearly","all"];
const FetchSalesChartData = async(req,res)=>{
    try{
        let type = req.query.type;
        const matchFilter = getMatchFilter(type);
        if(types.indexOf(type)===-1) type=types[3];
        const dateFormat = getDateFormat(type);
        const data = await Order.aggregate([
            {
                $match:
                {
                    "date":{$gte:new Date(matchFilter)},
                },
            },
            {
                $unwind:"$items"
            },
            {
                $group:{
                    _id:{$dateToString:{format:dateFormat,date:"$date"}},
                    total:{
                        $sum:{$multiply:["$items.cost","$items.amount"]}
                    },
                }
            }
        ]);
        res.status(200).json({data});
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch sales chart data"
        });
    }
};

module.exports = FetchSalesChartData;