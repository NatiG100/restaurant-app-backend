const {Schema,model} = require('mongoose');

const DrinkCategorySchema = new Schema({
    img:{
        type:String,
        default:"/img/drinkCategory/default.jpeg"
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
    drinkCount:{
        type:Schema.Types.Number,
        default:0,
    },
    status:{
        type:String,
        default:"Active",
    }
});

DrinkCategorySchema.method('toClient', function() {
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

const DrinkCategory = model('DrinkCategory',DrinkCategorySchema);
module.exports = DrinkCategory;