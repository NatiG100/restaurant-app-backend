const {Schema, model} = require('mongoose');
const crypto = require('crypto');

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
    hash:String,
    salt:String,
    img:{
        type:String,
        default:"img/user/default-avatar.jpeg"
    },
});

//set hash and salt for a user
UserSchema.methods.setPassword = function(password){
    // create unique salt for a user
    this.salt = crypto.randomBytes(16).toString('hex');

    //hashing user's salt and password with 1000 iterations
    this.hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        `sha512`
    ).toString(`hex`);
};

// Method to check the entered password
UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        `sha512`
    );

    return this.hash === hash;
}

UserSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.hash;
    delete obj.salt;

    return obj;
});

//create user model from user schema
const User = model('User', UserSchema);

module.exports = User;