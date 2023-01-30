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

module.exports = {
    DeleteAllDrinkCategory,
    AddDrinkCategory,
    FetchAllDrinkCategories
}