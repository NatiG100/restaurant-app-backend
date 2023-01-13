const {Schema, model} = require('mongoose');
const { change_idToid } = require('../utils/utils');

// user schema
const UserSchema = new Schema({
    fullName:{
        type:String,
        required: true,
        trim:true,
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
        required:true,
        trim:true,
    },
    hashedPassword:{
        type:"string",
        required:true,
    },
    img:{
        type:String,
        default:"/default-avatar.jpeg"
    },
});

change_idToid(UserSchema);

//create user model from user schema
const UserModel = model('User', UserSchema);

module.exports = UserModel;