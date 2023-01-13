const change_idToid = (Schema)=>{
    Schema.method('toClient', function() {
        var obj = this.toObject();

        //Rename fields
        obj.id = obj._id;
        delete obj._id;
    
        return obj;
    });
}

module.exports.change_idToid = change_idToid;