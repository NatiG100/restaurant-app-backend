const Notification = require("../models/Notification");

const fetchAllNotifications = async(req,res)=>{
    try{
        let allNotfication = await Notification.find().sort({_id:-1}).limit(30);
        res.status(200).json({
            data:allNotfication,
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch notifications"
        });
    }
};
const seeAllNotifications = async(req,res)=>{
    try{
        await Notification.updateMany({},{seen:true});
        res.status(200).json({
            messasge:"Success"
        })
    }catch(error){
        res.status(500).json({
            message:"failed to make notifications seen",
        })
    }
}

module.exports = {
    fetchAllNotifications,
    seeAllNotifications,
}