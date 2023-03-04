const Food = require('./../models/FoodModel');
//test
const DeleteAllFood = async(req,res)=>{
    try{
        await Food.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}
const AddFood = async(req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description,cost} = req.body;
    const categoryId = req.query.categoryId;
    const created = new Date(Date.now());
    try{
        const newFood = new Food({
            name,
            description,
            created,
            categoryId,
            cost,
            createdBy:req.session.user.id,
        });
        if(img){
            newFood.img = img;
        }
        await newFood.save();
        let populatedFood = await newFood.populate('createdBy');
        res.status(200).json({
            message:"A new food has been created",
            data: populatedFood.toClient(),
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:"Failed to add food"
        });
    }
};

const FetchAllFoods = async(req,res)=>{
    const categoryId = req.query.categoryId;
    const filter = {};
    if(req.query.status){
        filter.status = req.query.status
    }
    if(categoryId){
        filter.categoryId = categoryId
    }
    try{
        let allFood = await Food.find(filter).populate('createdBy');
        res.status(200).json({
            data:allFood.map((food)=>(food.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch foods"
        });
    }
}

const FetchFood = async(req,res)=>{
    try{
        const food = await Food.findById(req.params.foodId).populate('createdBy').exec();
        
        // if food is not found
        if(!food){
            res.status(400).send({
                message:"No food found with the provided id"
            }); 
        }
        
        //if food is found
        else{
            res.status(200).json({
                data:food.toClient()
            });
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch food"
        });
    }
};

const ChangeFoodStatus = async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await Food.updateOne(
            {_id:req.params.foodId},
            {status:req.body.status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No food found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed successfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change food status"
        });
    }
};

const UpdateFood = async(req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description,cost} = req.body;
    const updated = new Date(Date.now());
    try{
        const updatedFood = {
            name,
            description,
            updated,
            cost,
        }
        if(img){
            updatedFood.img = img;
        }

        await Food.updateOne({_id:req.params.foodId},updatedFood);
        res.status(200).json({
            message:"Successfully updated",
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to update foo"
        });
    }
}

module.exports = {
    AddFood,
    DeleteAllFood,
    FetchAllFoods,
    FetchFood,
    ChangeFoodStatus,
    UpdateFood,
}