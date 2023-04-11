const { types } = require("../../constants/constants");
const Order = require("../../models/OrderModel");
const { getMatchFilter, getDateFormat } = require("../../utils/dateUtils");
const { reshapeChartData } = require("../../utils/utils");

const FetchOrdersChartData = async (req,res)=>{
    try{
        let type = req.query.type;
        let itemType = req.query.itemType;
        const match={}
        if(itemType==="food"||itemType==="drink") match["items.itemType"]=itemType;
        if(types.indexOf(type)===-1) type = types[3];
        const matchFilter = getMatchFilter(type);
        const dateFormat = getDateFormat(type);
        let data = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:{
                    "date":{$gte:new Date(matchFilter)},
                    ...match
                },
            },
            {
                $group:{
                    _id:{status:"$status",date:{$dateToString:{format:dateFormat,date:"$date"}}},
                    amount:{
                        $sum:"$items.amount"
                    },
                }
            },
            {
                $project:{
                    status:"$_id.status",
                    date:"$_id.date",
                    amount:1,
                    _id:0,
                }
            },
            {
                $group:{
                    _id:"$status",
                    data:{$push:{amount:"$amount",date:"$date"}}
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);

        data.forEach((d)=>{
            reshapeChartData(d.data,type);
        })
        console.dir(data,{depth:6});
        res.status(200).json({
            data
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to fetch orders chart data"
        });
    }
}

module.exports = FetchOrdersChartData;