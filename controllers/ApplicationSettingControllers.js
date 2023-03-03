const ApplicationSetting = require("../models/ApplicationSettingModel");

const updateApplicationSetting = async(req,res)=>{
    const {taxRate,frontendWebDomain} = req.body;
    let changedFields = {};
    if(taxRate) changedFields.taxRate = taxRate;
    if(frontendWebDomain) changedFields.frontendWebDomain = taxRate;
    try{
        let settings = await ApplicationSetting.find();
        if(settings.length==0){
            if(!taxRate||!frontendWebDomain){
                res.status(400).json({
                    message:`Can't create a new setting. (${(!taxRate)?"taxRate":""}${(!taxRate&&!frontendWebDomain)?" & ":""}${(!frontendWebDomain)?"web domain":""} missing)`
                })
            }else{
                const setting = await ApplicationSetting.create({frontendWebDomain,taxRate});
                res.status(200).json({
                    message:"Setting successfully created",
                    data:setting,
                })
            }
        }else{
            const setting = await ApplicationSetting.findByIdAndUpdate(settings[0]._id,changedFields);
            res.status(200).json({
                message:"Setting successfully updated",
            })
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to update application setting"
        });
    }
}

const getapplicationSetting = async(req,res)=>{
    try{
        let settings = await ApplicationSetting.find();
        if(settings.length===0){
            res.status(400).json({
                message:"Application setting not found"
            })
        }else{
            res.status(200).json({
                data:settings[0],
            })
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch application setting"
        });
    }
}

module.exports = {
    updateApplicationSetting,
    getapplicationSetting,
}