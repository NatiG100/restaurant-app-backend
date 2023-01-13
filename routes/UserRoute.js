const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();

//register user route
router.post('/register',async (req,res)=>{
    try{
        const {fullName,email,previlages} = req.body;
        const password = "1234abcd";

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
            message:'A user Successfully registered',
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


router.get('/:userId',async (req,res)=>{
    try{
        const user = await User.findById(req.params.userId).exec();
        
        // if user is not found
        if(!user){
            res.status(400).send({
                message:"No user found with the provided id"
            }); 
        }
        
        //if user is found
        else{
            res.status(200).json({
                data:user
            })
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch user"
        });
    }
})

router.patch('/:userId/change-status',async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await User.updateOne(
            {id:req.params.userId},
            {status:req.body.status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No user found with the provided id"
            }); 
        }
        res.status(200).json({
            message:"Status changed succeessfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change user status"
        });
    }
})

router.patch('/:userId/update', async (req,res)=>{
    
})

module.exports = router;