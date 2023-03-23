const Notification = require("../models/Notification");

const fetchAllNotifications = async(req,res)=>{
    try{
        let allNotfication = await Notification.find();
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