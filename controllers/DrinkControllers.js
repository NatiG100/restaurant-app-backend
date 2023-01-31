const Drink = require("../models/DrinkModel");

const DeleteAllDrink = async(req,res)=>{
    try{
        await Drink.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}
const AddDrink = async(req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description,cost} = req.body;
    const categoryId = req.query.categoryId;
    const created = new Date(Date.now());
    try{
        const newDrink = new Drink({
            name,
            description,
            created,
            categoryId,
            cost,
            createdBy:req.session.user.id,
        });
        if(img){
            newDrink.img = img;
        }
        await newDrink.save();
        let populatedDrink = await newDrink.populate('createdBy');
        res.status(200).json({
            message:"A new drink has been created",
            data: populatedDrink.toClient(),
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to add drink"
        });
    }
};

const FetchAllDrinks = async(req,res)=>{
    const categoryId = req.query.categoryId;
    const filter = {};
    if(categoryId){
        filter.categoryId = categoryId
    }
    try{
        let allDrink = await Drink.find(filter).populate('createdBy');
        res.status(200).json({
            data:allDrink.map((drink)=>(drink.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch drinks"
        });
    }
};

const FetchDrink = async(req,res)=>{
    try{
        const drink = await Drink.findById(req.params.drinkId).populate('createdBy').exec();
        
        // if drink is not found
        if(!drink){
            res.status(400).send({
                message:"No drink found with the provided id"
            }); 
        }
        
        //if drink was found
        else{
            res.status(200).json({
                data:drink.toClient()
            });
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch drink"
        });
    }
};

const ChangeDrinkStatus = async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await Drink.updateOne(
            {_id:req.params.drinkId},
            {status:req.body.status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No drink found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed succeessfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change drink status"
        });
    }
};

const UpdateDrink = async(req,res)=>{
    const img = req?.uploadedFileName;
    const {name,description,cost} = req.body;
    const updated = new Date(Date.now());
    try{
        const updatedDrink = {
            name,
            description,
            updated,
            cost,
        }
        if(img){
            updatedDrink.img = img;
        }

        await Drink.updateOne({_id:req.params.drinkId},updatedDrink);
        res.status(200).json({
            message:"Successfully updated",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Failed to update drink"
        });
    }
}

module.exports = {
    AddDrink,
    DeleteAllDrink,
    FetchAllDrinks,
    FetchDrink,
    ChangeDrinkStatus,
    UpdateDrink,
}