const {Schema, model} = require('mongoose');

const TableSchema = new Schema({
    tableNumber:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:String,
        default:"Active"
    }
});

TableSchema.method('toClient',function(){
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

const Table = model('Table',TableSchema);

module.exports = Table;