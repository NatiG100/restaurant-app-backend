const FoodCategory = require('./../models/FoodCategoryModel');

//test
const DeleteAll = async(req,res)=>{
    try{
        await FoodCategory.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}

const AddFoodCategory = async (req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description} = req.body;
    const created = new Date(Date.now());
    try{
        const newFoodCategory = new FoodCategory({
            name,
            description,
            created
        });
        if(img){
            newFoodCategory.img = img;
        }
        await newFoodCategory.save();
        res.status(200).json({
            message:"A new food category has been created",
            data:newFoodCategory.toClient(),
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to add food category"
        });
    }
};

const FetchAllFoodCategories = async(req,res)=>{
    try{
        let allFoodCategories = await FoodCategory.find({});
        res.status(200).json({
            data:allFoodCategories.map((foodCategory)=>(foodCategory.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch food categories"
        });
    }
}

const FetchFoodCategory = async(req,res)=>{
    try{
        const foodCategory = await FoodCategory.findById(req.params.foodCategoryId).exec();
        
        // if user is not found
        if(!foodCategory){
            res.status(400).send({
                message:"No food category found with the provided id"
            }); 
        }
        
        //if user is found
        else{
            res.status(200).json({
                data:foodCategory.toClient()
            });
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch food category"
        });
    }
}

const ChangeFoodCategoryStatus = async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await FoodCategory.updateOne(
            {_id:req.params.foodCategoryId},
            {status:req.body.status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No food category found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed succeessfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change food category status"
        });
    }
}
module.exports = {
    AddFoodCategory,
    FetchAllFoodCategories,
    DeleteAll,
    FetchFoodCategory,
    ChangeFoodCategoryStatus,
}