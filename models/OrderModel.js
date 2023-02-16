const { Schema, model } = require("mongoose");

const Item = new Schema({
    itemType:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    cost:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
})

const OrderSchema = new Schema({
    date:{
        type:Date,
        required:true,
    },
    totalCost:{
        type:Number,
        required:true,
    },
    tableNumber:{
        required:true,
        type:String,
    },
    status:{
        type:String,
        default:"Pending"
    },
    items:[Item]
});

OrderSchema.method('toClient',function(){
    var obj = this.toObject();
    obj.id = obj._id;
    let currentTime = Date.now(),
        timeCreated = new Date(obj.date);
    obj.timeElapsed = Math.round((currentTime-timeCreated.getTime())/1000);
    delete obj._id;
    return obj;
})

const Order = model('Order',OrderSchema);

module.exports = Order;