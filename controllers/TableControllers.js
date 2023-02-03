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

const FetchTable = async(req,res)=>{
    try{
        const table = await Table.findById(req.params.tableId).exec();
        
        // if user is not found
        if(!table){
            res.status(400).send({
                message:"No table found with the provided id"
            }); 
        }
        
        //if user is found
        else{
            res.status(200).json({
                data:table.toClient()
            });
        }
    }catch(error){
        res.status(500).send({
            message:"Failed to fetch table"
        });
    }
}

const ChangeTableStatus = async(req,res)=>{
    const {status} = req.body;
    if(status!=='Active' && status!=='Suspended'){
        res.status(400).json({
            message:"Status must be either Active or Suspended"
        }); 
        return;
    }
    try{
        const result = await Table.updateOne(
            {_id:req.params.tableId},
            {status}
        );
        if(result.matchedCount===0){
            res.status(400).send({
                message:"No table found with the provided id"
            });
            return;
        }
        res.status(200).json({
            message:"Status changed succeessfully"
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to change table status"
        });
    }
}

const UpdateTable = async(req,res)=>{
    const {tableNumber} = req.body;
    try{
        await Table.updateOne({_id:req.params.tableId},{tableNumber});
        res.status(200).json({
            message:"Successfully updated",
        })
    }catch(error){
        res.status(500).send({
            message:"Failed to update table"
        });
    }
}

module.exports={
    DeleteAllTables,
    AddTable,
    FetchAllTables,
    FetchTable,
    UpdateTable,
    ChangeTableStatus
}