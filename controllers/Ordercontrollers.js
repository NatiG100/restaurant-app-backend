const Order = require("../models/OrderModel");

const requestOrder = async(req,res)=>{
    const {
        totalCost,
        tableNumber,
        items,
    } = req.body;
    const created = new Date(Date.now());
    try{
        const newOrder = new Order({
            date:created,
            totalCost,
            tableNumber,
            items
        });
        await newOrder.save();
        res.status(200).json({
            message:"Successfull",
            data: newOrder.toClient(),
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to order"
        });
    }
};

const FetchAllOrders = async(req,res)=>{
    try{
        let allOrders = await Order.find();
        res.status(200).json({
            data:allOrders.map((order)=>(order.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch orders"
        });
    }
}


module.exports = {
    requestOrder,
    FetchAllOrders
}