const Order = require("../../models/OrderModel");
const { getDateFormat, getMatchFilter, getDaysInThisMonth, getDateOfWeek } = require("../../utils/dateUtils");
const {types} = require("../../constants/constants")
const FetchSalesChartData = async(req,res)=>{
    try{
        let type = req.query.type;
        let itemType = req.query.itemType;
        const match={}
        if(itemType==="food"||itemType==="drink") match["items.itemType"]=itemType;
        if(types.indexOf(type)===-1) type=types[3];
        const matchFilter = getMatchFilter(type);
        const dateFormat = getDateFormat(type);
        let data = await Order.aggregate([
            {
                $unwind:"$items"
            },
            {
                $match:
                {
                    "date":{$gte:new Date(matchFilter)},
                    "status":"Served",
                    ...match,
                },
            },
            {
                $group:{
                    _id:{$dateToString:{format:dateFormat,date:"$date"}},
                    total:{
                        $sum:{$multiply:["$items.cost","$items.amount"]}
                    },
                }
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);
        const existingData = data.map((data)=>(parseFloat(data._id)));

        //convert the aggregated data to the desired shape
        if(type==="monthly"){
            for(let i=1;i<getDaysInThisMonth()+1;i++){
                if(existingData.indexOf(i)===-1){
                    let _id = i<10?"0"+i:i.toString();
                    data.push({_id,total:0});
                }
            }
        }if(type==="yearly"){
            for(let i=1;i<13;i++){
                if(existingData.indexOf(i)===-1){
                    let _id = i<10?"0"+i:i.toString();
                    data.push({_id,total:0});
                }
            }
        }if(type==="weekly"){
            const datesOfWeek = getDateOfWeek();
            for(let i=1;i<8;i++){
                if(existingData.indexOf(datesOfWeek[i])===-1){
                    let _id = datesOfWeek[i]<10?"0"+datesOfWeek[i]:datesOfWeek[i].toString();
                    data.push({_id,total:0});
                }
            }
        }

        //sort the data
        data.sort((a,b)=>(parseInt(a._id)-parseInt(b._id)));
        res.status(200).json({data});
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch sales chart data"
        });
    }
};

module.exports = FetchSalesChartData;