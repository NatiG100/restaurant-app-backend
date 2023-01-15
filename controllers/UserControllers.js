const User = require('../models/UserModel');


const DeleteAll = async(req,res)=>{
    try{
        await User.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}

const RegisterUser = async (req,res)=>{
    try{
        let img = req.uploadedFileName;
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

        //add the image if an image exists
        if(img){
            newUser.img = img;
        }
        newUser.setPassword(password);

        // save the user to the database
        await newUser.save();
        res.status(200).json({
            message:'A user Successfully registered',
            data:newUser.toClient()
        });
    }catch(error){
        res.status(500).send({
            message:"Failed to add user"
        });
    }
}

const FetchAllUsers = async (req,res)=>{
    console.log(req.session.user);
    try{
        let allUsers = await User.find({});
        res.status(200).json({
            data:allUsers.map((user)=>(user.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch users"
        });
    }
}

const FetchUser = async (req,res)=>{
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
                data:user.toClient()
            })
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch user"
        });
    }
}

const ChangeUserStatus = async(req,res)=>{
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
}

const UpdateUser = async (req,res)=>{
    const{fullName,email,previlages} = req.body;
    let img = req.uploadedFileName;
    try{
        if(email){
            const user = await User.findById(req.params.userId);
            // reject duplicate email
            const doc = await User.exists({email});
            // if a user exists and if it is not the current user
            if(doc && user.email!==email){
                res.status(400).send({
                    message:"User with the same email already exists"
                });
                return;
            }
        }
        let updatedUser = {};
        if(email) {updatedUser.email = email}
        if(fullName) {updatedUser.fullName = fullName}
        if(previlages) {updatedUser.previlages = previlages}
        if(img) {updatedUser.img = img}
        console.log(updatedUser);
        const result = await User.updateOne(
            {id:req.params.userId},
            updatedUser,
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No user found with the provided id"
            }); 
        }
        res.status(200).json({
            message:"User updated successfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to update user"
        });
    }
}

module.exports = {
    RegisterUser,
    FetchAllUsers,
    FetchUser,
    ChangeUserStatus,
    UpdateUser,
    DeleteAll,
}