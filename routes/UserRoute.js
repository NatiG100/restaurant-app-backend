const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();

//route for registering user
router.post('/register',(req,res)=>{
    const {fullName,email,previlages,password} = req.body;

    // create new user instance
    const newUser = new UserModel({
        fullName,
        email,
        previlages,
        hashedPassword:password
    });

    //save instance
    newUser.save(function(error){
        if(error){

        }
    });
    
    res.json({
        message:'Successfull',
        data:{
            user:newUser
        }
    });
});


router.get('/',(req,res)=>{
    res.send('all users')
})
router.get('/:userId',(req,res)=>{
    res.send('get single user')
})

router.patch('/change-status/:userId',(req,res)=>{
    res.send('change status')
})

router.patch('/update/:userId',(req,res)=>{
    res.send('Update user')
})

module.exports = router;