const { types } = require("../../constants/constants");
const Order = require("../../models/OrderModel");
const {  addDay, formatDate } = require("../../utils/dateUtils");

const FetchAllSales = async(req,res)=>{
    try{
        let itemType = req.query.itemType;
        const match  = {}
        if(itemType==="food"||itemType==="drink") match["items.itemType"] = itemType;
        let data = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:
                {
                    "status":"Served",
                    ...match,
                }
            },
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d",date:"$date"}},
                    total:{
                        $sum:{$multiply:["$items.cost","$items.amount"]}
                    }
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);
        const existingData = data.map((data)=>(data?._id));
        let maxDate = data[data.length-1]?._id;
        let currentDate = data[0]?._id;
        while(maxDate!==currentDate){
            currentDate= formatDate(addDay(new Date(currentDate),1));
            if(existingData.indexOf(currentDate)===-1){
                data.push({
                    _id:currentDate,
                    total:0,
                })
            }
        }
        data.sort((a,b)=>(new Date(a?._id)-new Date(b?._id)));
        res.status(200).json({data});
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Failed to fetch average time chart data"
        })
    }
}

module.exports = FetchAllSales;