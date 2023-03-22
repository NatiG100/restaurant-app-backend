const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    seen:{
        type:Boolean,
        default:false,
    }
});

const Notification = model('Notification',NotificationSchema);
export default Notification;