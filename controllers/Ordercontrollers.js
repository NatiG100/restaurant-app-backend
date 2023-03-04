const Order = require("../models/OrderModel");

const DeleteAllOrders = async(req,res)=>{
    try{
        await Order.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}

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
};
const ChangeOrderStatus = async(req,res)=>{
    const {status} = req.body;
    const OrderStatuses = ["Pending","Cancelled","Started","Served"];
    if(!OrderStatuses.includes(status)){
        res.status(400).json({
            message:"Incorrect status field"
        }); 
        return;
    }
    
    try{
        const order = await Order.findById(req.params.orderId);
        let oldSt = OrderStatuses.indexOf(order.status);
        let newSt = OrderStatuses.indexOf(status);
        if((oldSt>=newSt)||order.status==="Cancelled"){
            res.status(400).send({
                message:`You can't change an order status from '${order.status}' to '${status}'`
            });
            return;
        }
        let changedFields = {status:req.body.status}
        //add cancelled or served datae inorder to stop counting time elapsed for an order
        if(status==="Cancelled"||status==="Served"){
            changedFields.orderCanceledOrServedDate=new Date(Date.now());
        }
        const result = await Order.updateOne(
            {_id:req.params.orderId},
            changedFields
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No order found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed successfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change food status"
        });
    }
};


module.exports = {
    requestOrder,
    FetchAllOrders,
    DeleteAllOrders,
    ChangeOrderStatus,
}