const Table = require("../models/TableModel");

//test
const DeleteAllTables = async(req,res)=>{
    try{
        await Table.deleteMany({});
        res.json({message:"Successfull"});
    }catch(error){
        res.json({message:"Failed to delete"});
    }
}
const AddTable = async(req,res)=>{
    const {tableNumber} = req.body;
    try{
        const newTable = new Table({
            tableNumber
        });
        const table = await newTable.save();
        res.status(200).json({
            message:"A new food has been created",
            data: table.toClient(),
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to add table"
        });
    }
};

const FetchAllTables = async(req,res)=>{
    try{
        let allTable = await Table.find({});
        res.status(200).json({
            data:allTable.map((table)=>(table.toClient()))
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch tables"
        });
    }
};

module.exports={
    DeleteAllTables,
    AddTable,
    FetchAllTables
}