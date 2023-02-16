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
        console.log(error);
        res.status(500).send({
            message:"Failed to order"
        });
    }
};

module.exports = {
    requestOrder,
}