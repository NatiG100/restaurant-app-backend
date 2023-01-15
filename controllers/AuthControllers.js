const User = require('../models/UserModel');

const Login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        //if a user is already logged in return error
        if(req.session.user){
            res.status(400).send({
                message:"Already logged in"
            });
            return;
        }
        //check whether both email and password are provided
        if(!email || !password ){
            res.status(400).send({
                message:"email and password are required"
            });
            return;
        }
        //fetch the user
        const user = await User.findOne({email});
        //if he user doesn't exist respond with an error
        if(!user){
            res.status(400).send({
                message:"Invalid credentials"
            });
            return;
        }

        //if the password is valid
        if(user.validPassword(password)){
            req.session.user = user.toClient();
            res.status(200).json({
                message:'Successfull',
                data:user.toClient()
            });
        }else{
            res.status(400).send({
                message:"Invalid credentials"
            });
        }


    }catch(error){
        res.status(500).send({
            message:"Failed to login"
        });
    }
}

const Logout = async(req,res)=>{
    try{
        //if a user is not logged in return error
        if(!req.session.user){
            res.status(400).send({
                message:"You haven't logged in"
            });
        }else{
            req.session.destroy();
            res.status(200).json({
                message:'Successfull',
            });
        }
    }catch{
        res.status(500).send({
            message:"Failed to login"
        }); 
    }
}

const WhoAmI = async(req,res)=>{
    try{
        if(!req.session?.user){
            res.status(400).send({
                message:"You haven't logged in"
            });
        }else{
            res.status(200).json({
                message:'Successfull',
                data:req.session.user,
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to tell users identiy"
        });
    }
}

module.exports = {
    Login,
    Logout,
    WhoAmI,
}