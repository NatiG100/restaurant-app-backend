const {model,Schema} = require('mongoose');
const ApplicationSettingSchema = new Schema({
    taxRate:{
        type:Number,
        required:true,
    },
    frontendWebDomain:{
        type:String,
        required:true,
    }
});

const ApplicationSetting = model('ApplicationSetting',ApplicationSettingSchema);
module.exports = ApplicationSetting;