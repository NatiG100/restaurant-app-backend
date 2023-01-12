const {Schema, Model} = require('mongoose');

// user schema
const UserSchema = new Schema({
    fullName:{
        type:String,
        required: true,
    },
    previlages:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        default:"Active"
    },
    email:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:"/default-avatar.jpeg"
    },
});

change_idToid(UserSchema);

//create user model from user schema
const UserModel = Model('User', UserSchema);

module.exports = UserModel;