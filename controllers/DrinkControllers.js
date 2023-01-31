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
}

module.exports = {
    AddDrink,
    DeleteAllDrink,
    FetchAllDrinks,
}