const DrinkCategory = require('../models/DrinkCategoryModel');

//test
const DeleteAllDrinkCategory = async(req,res)=>{
    try{
        await DrinkCategory.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
};

const AddDrinkCategory = async (req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description} = req.body;
    const created = new Date(Date.now());
    try{
        const newDrinkCategory = new DrinkCategory({
            name,
            description,
            created
        });
        if(img){
            newDrinkCategory.img = img;
        }
        await newDrinkCategory.save();
        res.status(200).json({
            message:"A new drink category has been created",
            data:newDrinkCategory.toClient(),
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to add drink category"
        });
    }
};

const FetchAllDrinkCategories = async(req,res)=>{
    try{
        let allDrinkCategories = await DrinkCategory.find({});
        res.status(200).json({
            data:allDrinkCategories.map((drinkCategory)=>(drinkCategory.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch drink categories"
        });
    }
}

const FetchDrinkCategory = async(req,res)=>{
    try{
        const drinkCategory = await DrinkCategory.findById(req.params.drinkCategoryId).exec();
        
        // if drink is not found
        if(!drinkCategory){
            res.status(400).send({
                message:"No drink category found with the provided id"
            }); 
        }
        
        //if drink category is found
        else{
            res.status(200).json({
                data:drinkCategory.toClient()
            });
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch drink category"
        });
    }
}

const ChangeDrinkCategoryStatus = async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await DrinkCategory.updateOne(
            {_id:req.params.drinkCategoryId},
            {status:req.body.status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No drink category found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed succeessfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change drink category status"
        });
    }
};

const UpdateDrinkCategory = async(req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description} = req.body;
    const updated = new Date(Date.now());
    try{
        const updatedDrinkCategory = {
            name,
            description,
            updated,
        }
        if(img){
            updatedDrinkCategory.img = img;
        }

        await DrinkCategory.updateOne({_id:req.params.drinkCategoryId},updatedDrinkCategory);
        res.status(200).json({
            message:"Successfully updated",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to update drink category"
        });
    }
}

module.exports = {
    DeleteAllDrinkCategory,
    AddDrinkCategory,
    FetchAllDrinkCategories,
    FetchDrinkCategory,
    ChangeDrinkCategoryStatus,
    UpdateDrinkCategory,
}