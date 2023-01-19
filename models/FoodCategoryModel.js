const {Schema,model} = require('mongoose');

const FoodCategorySchema = new Schema({
    img:{
        type:String,
        default:"/img/foodCategory/default.jpeg"
    },
    name:{
        type:String,
        required:true,
    },
    description:String,
    created:{
        type:Date,
        required:true,
    },
    updated:Date,
    foodCount:{
        type:Schema.Types.Number,
        default:0,
    },
    status:{
        type:String,
        default:"Active",
    }
});

FoodCategorySchema.method('toClient', function() {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

const FoodCategory = model('FoodCategory',FoodCategorySchema);
module.exports = FoodCategory;