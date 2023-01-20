const { model,Schema } = require("mongoose");

const FoodSchema = new Schema({
    category:{
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
    createtd:{
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
        type:Schema.Types.Decimal128
    }
});

FoodSchema.methods('toClient',function(){
    var obj = this.toObject();
    obj.categoryId = obj.category._id;
    delete obj.category;
    var creatorName = obj.createdBy.fullName;
    obj.createdBy = creatorName;

    return obj;
})

const Food = model('Food',FoodSchema);

module.exports = Food;