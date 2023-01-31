const { model,Schema } = require("mongoose");

const DrinkSchema = new Schema({
    categoryId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'DrinkCategory'
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
        default:"/img/drink/default.jpeg",
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

DrinkSchema.method('toClient',function(){
    var obj = this.toObject();
    obj.createdBy = obj.createdBy.fullName;
    obj.imgs = [];
    obj.id = obj._id;
    delete obj._id;
    return obj;
})

const Drink = model('Drink',DrinkSchema);

module.exports = Drink;