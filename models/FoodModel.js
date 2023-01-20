const { model,Schema } = require("mongoose");

const FoodSchema = new Schema({
    categoryId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'FoodCategory'
    },
    name:{
        required:true,
        type:String,
    },
    description:String,
    status:{
        default:"Active",
        type:String
    },
    img:{
        default:"/img/food/default.jpeg",
        type:String,
    },
    created:{
        required:true,
        type:Date,
    },
    updated:Date,
    createdBy:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    cost:{
        required:true,
        type:Schema.Types.Number,
    },
    totalSales:{
        default:0,
        type:Schema.Types.Number
    }
});

FoodSchema.method('toClient',function(){
    var obj = this.toObject();
    obj.createdBy = obj.createdBy.fullName;    
    return obj;
})

const Food = model('Food',FoodSchema);

module.exports = Food;