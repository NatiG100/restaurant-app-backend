const express = require('express');
const User = require('../models/UserModel');
const AuthRouter = express.Router();

AuthRouter.post('/login',async(req,res)=>{
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
            req.session.user = user;
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
})

module.exports = AuthRouter;