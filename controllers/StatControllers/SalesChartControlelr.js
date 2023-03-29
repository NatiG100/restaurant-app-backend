const Order = require("../../models/OrderModel");

const types = ["weekly","monthly","yearly","all"]
const fetchSalesChartData = async(req,res)=>{
    try{
        let type = req.query.type;
        if(types.indexOf(type)===-1) type=types[3];
        const data = Order.aggregate([
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d",date:"$date"}},
                    count:{$sum:1}
                }
            }
        ]) 
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch sales chart data"
        });
    }
}