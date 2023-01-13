const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();

//register user route
router.post('/register',async (req,res)=>{
    const {fullName,email,previlages,password} = req.body;

    try{

        // reject duplicate email
        const doc = await User.exists({email});
        if(doc){
            res.status(400).send({
                message:"User with the same email already exists"
            });
            return;
        }

        // create new user instance
        const newUser = new User({
            fullName,
            email,
            previlages,
        });
        newUser.setPassword(password);

        // save the user to the database
        await newUser.save();
        res.status(200).json({
            message:'User Successfully registered',
            data:{
                fullName,
                email,
                previlages,
                id:newUser._id
            }
        });
    }catch(error){
        res.status(500).send({
            message:"Failed to add user"
        });
    }
});


//fetch all users
router.get('/', async (req,res)=>{
    try{
        let allUsers = await User.find({});
        res.status(200).json({
            data:allUsers
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch users"
        });
    }
});


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