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
    table:{
        required:true,
        type:String,
    },
    foods:{
        required:true,
        type:[Schema.Types.ObjectId],
        ref:'Food'
    },
    items:[Item]
});

OrderSchema.method('toClien',function(){
    var obj = this.toObject();
    obj.id = obj._id;
    let currentTime = Date.now(),
        final = new Date(obj.date);
    obj.timeElapsed = Math.round((final.getTime()-currentTime.getTime())/1000);
    delete obj._id;
    return obj;
})

const Order = model('Order',OrderSchema);

export default Order;